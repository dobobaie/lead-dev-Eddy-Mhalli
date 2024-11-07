import { HttpStatus } from "@nestjs/common";
import { HttpExceptionError } from "./http-exception.error";

type InternalServerErrorPayload = undefined;

export class InternalServerError extends HttpExceptionError {
  code = "InternalServer" as const;
  status = HttpStatus.INTERNAL_SERVER_ERROR;

  constructor(payload: InternalServerErrorPayload = undefined) {
    super("Internal server error", payload);
  }
}
