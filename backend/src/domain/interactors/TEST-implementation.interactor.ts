import { Injectable } from "@nestjs/common";

import { GrogConnector } from "../../infrastructure/connectors/grog";

@Injectable()
export class TESTImplementationInteractor {
  constructor(private readonly grogConnector: GrogConnector) {}

  async execute(): Promise<void> {
    this.grogConnector.displayModels();
  }
}
