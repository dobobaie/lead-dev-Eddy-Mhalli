import { CommonError } from "./common.error";

export class InternalError extends CommonError {
  code = "Internal" as const;

  constructor(message = "Internal error", payload: any = {}) {
    super(message, payload);
  }
}
