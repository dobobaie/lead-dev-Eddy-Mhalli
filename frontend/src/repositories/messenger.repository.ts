import { Message } from "../entities/message.entity";
import { Messenger } from "../entities/messenger.entity";
import { MessengerSendMessageToAssistantBodyDTO } from "../sdks/sdk-api";
import { Repository } from "./repository";

export class MessengerRepository extends Repository {
  public async getMessengers(): Promise<Messenger[]> {
    const result =
      await this.getSdk().messengerGetMessengersControllerGetMessengers({
        headers: { "x-session-id": this.getAuthorization() } as Record<
          string,
          string
        >,
      });
    return result.messengers;
  }

  public async newConversation(): Promise<string> {
    const result =
      await this.getSdk().messengerCreateConversationControllerCreate({
        headers: { "x-session-id": this.getAuthorization() } as Record<
          string,
          string
        >,
      });
    return result.messengerId;
  }

  public async getMessages(messengerId: string): Promise<Message[]> {
    const result =
      await this.getSdk().messengerGetMessagesControllerGetMessages(
        { messengerId },
        {
          headers: { "x-session-id": this.getAuthorization() } as Record<
            string,
            string
          >,
        }
      );
    return result.messages;
  }

  public async sendMessageToAssistant(
    messengerId: string,
    input: MessengerSendMessageToAssistantBodyDTO
  ): Promise<ReadableStreamDefaultReader<Uint8Array>> {
    const response =
      await this.getSdk().messengerSendMessageToAssistantControllerSendMessageRaw(
        { messengerId, messengerSendMessageToAssistantBodyDTO: input },
        {
          headers: {
            "x-session-id": this.getAuthorization(),
            "Content-Type": "application/json",
          } as Record<string, string>,
        }
      );
    return response.raw.body?.getReader()!;
  }
}

export default new MessengerRepository();
