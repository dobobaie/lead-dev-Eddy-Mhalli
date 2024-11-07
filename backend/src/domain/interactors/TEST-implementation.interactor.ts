import { Injectable } from "@nestjs/common";

import { GrogConnector } from "../../infrastructure/connectors/grog";

@Injectable()
export class TESTImplementationInteractor {
  constructor(private readonly grogConnector: GrogConnector) {}

  async execute(): Promise<void> {
    await this.grogConnector.getAssistantReply([
      {
        role: "system",
        content: "you are a helpful assistant.",
      },
    ]);
  }
}
