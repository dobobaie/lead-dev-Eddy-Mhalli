import { Injectable } from "@nestjs/common";

import { GrogConnector } from "../../infrastructure/connectors/grog";
import { Messenger } from "../entities/messenger.entity";
import { User } from "../entities/user.entity";
import { Message } from "../entities/message.entity";
import { GetMessagesByMessengerUseCase } from "./get-messages-by-messenger.use-case";

type SendMessageToAssistantInput = {
  userSessionId: User["sessionId"];
  messengerId: Messenger["id"];
  message: Message["message"];
};
type SendMessageToAssistantOutput = ReadableStream;

@Injectable()
export class SendMessageToAssistantUseCase {
  constructor(
    private readonly getMessagesByMessengerUseCase: GetMessagesByMessengerUseCase,
    private readonly grogConnector: GrogConnector,
  ) {}

  async execute(
    input: SendMessageToAssistantInput,
  ): Promise<SendMessageToAssistantOutput> {
    const messages = await this.getMessagesByMessengerUseCase.execute(input);

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
}
