export class CommonError<T = any> extends Error {
  readonly code: string = "Error";
  readonly isSafeDisplay: boolean = true;

  constructor(
    readonly message: string,
    readonly payload?: T,
  ) {
    super(message);
  }

  toObject(): { code: string; message: string; payload?: any } {
    return {
      code: this.code,
      message: this.message,
      // TODO: the code below should be handle by presentation not dirty like this
      payload: this.isSafeDisplay ? this.payload : "CENSORED",
    };
  }
}
