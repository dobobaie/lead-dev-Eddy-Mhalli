import { Injectable } from "@nestjs/common";

import { GrogConnector } from "../../infrastructure/connectors/grog";
import { Messenger } from "../entities/messenger.entity";
import { User } from "../entities/user.entity";
import { Message, createMessage } from "../entities/message.entity";
import { GetMessagesByMessengerUseCase } from "./get-messages-by-messenger.use-case";
import { MessageRepository } from "../../infrastructure/repositories/message.repository";

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
    private readonly messageRepository: MessageRepository,
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

    // NOTE: prepare to persist messages after stream is terminated
    const persistMessages = async (assistantMessage: string) => {
      await this.persistMessage(
        createMessage({
          messengerId: input.messengerId,
          message: input.message,
          sender: "user",
        }),
      );
      await this.persistMessage(
        createMessage({
          messengerId: input.messengerId,
          message: assistantMessage,
          sender: "assistant",
        }),
      );
    };

    // NOTE: we're waiting the stream is finished to close the stream
    let fullMessage = "";
    const transformStream = stream.pipeThrough(
      new TransformStream({
        transform(chunk, controller) {
          const message = JSON.parse(new TextDecoder().decode(chunk));
          const value = message.choices.map(({ delta }) => delta.content).join("");
          controller.enqueue(value);
          fullMessage += value;
        },
        async flush(controller) {
          await persistMessages(fullMessage);
          controller.terminate();
        },
      }),
    );

    return transformStream;
  }

  private async persistMessage(message: Message): Promise<void> {
    await this.messageRepository.create(message);
  }
}
