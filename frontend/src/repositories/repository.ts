import { DefaultApi, Configuration } from "../sdks/sdk-api";

import config from "../config/default";

export class Repository {
  private sdk: DefaultApi;

  constructor() {
    const configuration = new Configuration({
      basePath: config.services.public_api.url,
    });
    this.sdk = new DefaultApi(configuration);
  }

  protected getSdk(): DefaultApi {
    return this.sdk;
  }

  protected getAuthorization(): string | undefined {
    const userSessionIdStorage = localStorage.getItem("userSessionId");
    return userSessionIdStorage || undefined;
  }
}
