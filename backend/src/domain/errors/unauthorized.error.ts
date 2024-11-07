import { DomainError } from "./domain.error";

// eslint-disable-next-line @typescript-eslint/ban-types
type UnauthorizedErrorPayload = {};

export class UnauthorizedError extends DomainError<UnauthorizedErrorPayload> {
  code = "Unauthorized" as const;

  constructor(readonly payload: UnauthorizedErrorPayload = {}) {
    super("Unauthorized", payload);
  }
}
