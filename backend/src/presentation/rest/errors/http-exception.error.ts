import { HttpStatus } from "@nestjs/common";

export class HttpExceptionError<T = any> extends Error {
  readonly code: string = "HttpException";
  readonly status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

  constructor(
    readonly message: string,
    readonly payload?: T,
  ) {
    super(message);
  }
}
