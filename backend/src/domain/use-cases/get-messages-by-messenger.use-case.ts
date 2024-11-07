import { Injectable } from "@nestjs/common";

import { MessageRepository } from "../../infrastructure/repositories/message.repository";
import { MessengerRepository } from "../../infrastructure/repositories/messenger.repository";
import { Messenger } from "../entities/messenger.entity";
import { User } from "../entities/user.entity";
import { Message } from "../entities/message.entity";
import { MessengerNotFoundError } from "../errors/messenger-not-found.error";
import { UnauthorizedError } from "../errors/unauthorized.error";

type GetMessagesByMessengerInput = {
  userSessionId: User["sessionId"];
  messengerId: Messenger["id"];
};
type GetMessagesByMessengerOutput = Message[];

@Injectable()
export class GetMessagesByMessengerUseCase {
  constructor(
    private readonly messengerRepository: MessengerRepository,
    private readonly messageRepository: MessageRepository,
  ) {}

  async execute(
    input: GetMessagesByMessengerInput,
  ): Promise<GetMessagesByMessengerOutput> {
    const messenger = await this.getMessenger(input.messengerId);

    this.verifyUserOwnMessenger({
      messengerUserSessionId: messenger.userSessionId,
      userSessionId: input.userSessionId,
    });

    const messages = await this.getMessagesByMessengerId(input.messengerId);
    return messages;
  }

  private async getMessenger(messengerId: Messenger["id"]): Promise<Messenger> {
    const messenger = await this.messengerRepository.find(messengerId);
    if (messenger === null) {
      throw new MessengerNotFoundError({ messengerId });
    }
    return messenger;
  }

  private verifyUserOwnMessenger(input: {
    messengerUserSessionId: string;
    userSessionId: string;
  }): void {
    if (input.messengerUserSessionId !== input.userSessionId) {
      throw new UnauthorizedError();
    }
  }

  private async getMessagesByMessengerId(
    messengerId: Messenger["id"],
  ): Promise<Message[]> {
    return await this.messageRepository.findAllByMessenger(messengerId);
  }
}
