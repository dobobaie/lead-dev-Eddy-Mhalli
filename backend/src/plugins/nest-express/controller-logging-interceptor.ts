import * as _ from "lodash";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { randomUUID } from "crypto";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { match } from "ts-pattern";

import { NativeLogger } from "../logger";
import { merge } from "../../common/utils/object.util";

@Injectable()
export class ControllerLoggingInterceptor implements NestInterceptor {
  private readonly logger = new NativeLogger({
    context: "ControllerLoggingInterceptor",
  });

  initComingRequest() {
    return {
      requestId: randomUUID(),
      requestStartDate: Date.now(),
    };
  }

  httpExtractRequest(req: any) {
    return merge(_.pick(req, ["query", "body", "params", "trace", "originalUrl"]), {
      method: req.method.toUpperCase(),
    });
  }

  httpLoggingInterceptor(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    const { originalUrl, trace, method, params } = this.httpExtractRequest(req);
    const { requestId, requestStartDate } = this.initComingRequest();

    if (method === "OPTIONS" || ["", "/"].includes(originalUrl)) {
      return next.handle();
    }

    this.logger.info(`HTTP Request ${method} ${originalUrl}\n`, {
      type: "request",
      method,
      originalUrl,
      trace,
      params,
      requestId,
    });

    return next.handle().pipe(
      tap(() => {
        this.logger.info(`HTTP Response ${method} ${originalUrl}\n`, {
          type: "response",
          method,
          originalUrl,
          trace,
          params,
          requestId,
          duration: Date.now() - requestStartDate + "ms",
        });
      }),
      catchError((originError) => {
        const stack = originError.stack;
        this.logger.error(
          `HTTP Error ${method} ${originalUrl} - ${originError.status ?? res.statusCode}\n${stack}`,
          {
            type: "error",
            method,
            originalUrl,
            trace,
            params,
            originError,
            requestId,
            duration: Date.now() - requestStartDate + "ms",
          },
        );
        throw originError;
      }),
    );
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return match(context.getType<"http">())
      .with("http", () => this.httpLoggingInterceptor(context, next))
      .otherwise((contextType: string) => {
        this.logger.info(
          `${contextType.toUpperCase()} Request - Implementation not found`,
        );
        return next.handle().pipe(
          tap(() => {
            this.logger.info(
              `${contextType.toUpperCase()} Response - Implementation not found`,
            );
          }),
          catchError((error) => {
            this.logger.info(
              `${contextType.toUpperCase()} Error - Implementation not found`,
              { error },
            );
            throw error;
          }),
        );
      });
  }
}
