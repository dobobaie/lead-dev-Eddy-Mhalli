import { HttpStatus } from "@nestjs/common";
import { HttpExceptionError } from "./http-exception.error";

type WrongOrMissingUserSessionPayload = { received?: string | undefined };

export class WrongOrMissingUserSessionError extends HttpExceptionError {
  code = "WrongOrMissingUserSession" as const;
  status = HttpStatus.UNAUTHORIZED;

  constructor(payload: WrongOrMissingUserSessionPayload = {}) {
    super("Wrong or missing user session", payload);
  }
}
