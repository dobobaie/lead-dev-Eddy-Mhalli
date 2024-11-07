import { Injectable } from "@nestjs/common";

import { GrogConnector } from "../../infrastructure/connectors/grog";
import { MessageRepository } from "../../infrastructure/repositories/message.repository";
import { MessengerRepository } from "../../infrastructure/repositories/messenger.repository";
import { Messenger } from "../entities/messenger.entity";
import { User } from "../entities/user.entity";
import { Message } from "../entities/message.entity";
import { MessengerNotFoundError } from "../errors/messenger-not-found.error";
import { UnauthorizedError } from "../errors/unauthorized.error";

type SendMessageToAssistantInput = {
  userSessionId: User["sessionId"];
  messengerId: Messenger["id"];
  message: Message["message"];
};
type SendMessageToAssistantOutput = ReadableStream;

@Injectable()
export class SendMessageToAssistantUseCase {
  constructor(
    private readonly grogConnector: GrogConnector,
    private readonly messengerRepository: MessengerRepository,
    private readonly messageRepository: MessageRepository,
  ) {}

  async execute(
    input: SendMessageToAssistantInput,
  ): Promise<SendMessageToAssistantOutput> {
    const messenger = await this.getMessenger(input.messengerId);

    this.verifyUserOwnMessenger({
      messengerUserSessionId: messenger.userSessionId,
      userSessionId: input.userSessionId,
    });

    const messages = await this.getMessagesByMessengerId(input.messengerId);

    const stream = await this.grogConnector.getAssistantReply([
      ...messages.map((message) => ({
        role: message.sender,
        content: message.message,
      })),
      {
        role: "user",
        content: input.message,
      },
    ]);

    // ---
    const reader = stream.getReader();
    reader!.read().then(function pump({ done, value }) {
      if (done) {
        return;
      }

      const message = JSON.parse(new TextDecoder().decode(value));
      console.log(message.choices.map(({ delta }) => delta.content).join(""));
      return reader!.read().then(pump);
    });
    // ---

    // wait bot answer before save user message

    return stream;
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
