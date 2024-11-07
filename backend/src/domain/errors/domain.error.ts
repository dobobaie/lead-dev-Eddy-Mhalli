export class DomainError<T = any> extends Error {
  readonly code: string = "Domain";

  constructor(
    readonly message: string,
    readonly payload?: T,
  ) {
    super(message);
  }
}
