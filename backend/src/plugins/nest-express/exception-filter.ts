import * as _ from "lodash";
import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { match } from "ts-pattern";

import { InternalServerError } from "../../presentation/rest/errors/internal-server.error";
import { ERROR_FORMAT_ATTRIBUTES } from "../../common/errors/constants";
import { NativeLogger } from "../logger";

// https://docs.nestjs.com/faq/request-lifecycle#summary
@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new NativeLogger({
    context: "ExceptionFilter",
  });

  httpErrorHandler(originError: any, req: any, res: any) {
    const status: HttpStatus = originError.status
      ? originError.status
      : HttpStatus.BAD_REQUEST;
    if (originError.response && !originError.payload) {
      originError.payload = originError.response.message;
    }

    const error = _.pick(
      status === HttpStatus.INTERNAL_SERVER_ERROR
        ? new InternalServerError()
        : originError,
      ERROR_FORMAT_ATTRIBUTES,
    );

    if (error.code === "WrongOrMissingApiKey") {
      this.logger.error(
        `HTTP Unauthorized ${req.method} ${req.originalUrl} - ${res.statusCode}`,
        {
          type: "unauthorized",
          headers: req.headers,
          originError,
        },
      );
    }

    res.status(status);
    res.json(error);
    res.end();
  }

  catch(originError: any, host: ArgumentsHost) {
    return match(host.getType<"http">()).with("http", () => {
      const ctx = host.switchToHttp();
      const req = ctx.getRequest();
      const res = ctx.getResponse();
      this.httpErrorHandler(originError, req, res);
    });
  }
}
