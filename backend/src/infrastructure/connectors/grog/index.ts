import { Injectable } from "@nestjs/common";
import Groq from "groq-sdk";

import config from "../../../config/default";
import { Logger } from "../../../plugins/logger";

@Injectable()
export class GrogConnector {
  private sdk: Groq;

  constructor(private readonly logger: Logger) {
    this.sdk = new Groq({ apiKey: config.llm.grog.api.key });
  }

  public async displayModels() {
    const results = await this.sdk.models.list();
    this.logger.info("----------->", results);
  }
}
