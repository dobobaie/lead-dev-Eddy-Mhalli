import { CommonError } from "./common.error";

export class UnexpectedError extends CommonError {
  code = "Unexpected" as const;

  constructor() {
    super("Unexpected error");
  }
}
