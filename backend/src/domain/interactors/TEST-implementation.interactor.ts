import { Injectable } from "@nestjs/common";

import { GrogConnector } from "../../infrastructure/connectors/grog";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { createUser } from "../entities/user.entity";

@Injectable()
export class TESTImplementationInteractor {
  constructor(
    private readonly grogConnector: GrogConnector,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<void> {
    await this.grogConnector.getAssistantReply([
      {
        role: "system",
        content: "you are a helpful assistant.",
      },
    ]);
    await this.userRepository.create(
      createUser({ name: "Toto", sessionId: "toto" }),
    );
  }
}
