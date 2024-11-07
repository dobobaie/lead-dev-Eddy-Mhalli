import { Injectable } from "@nestjs/common";

import { MessengerRepository } from "../../infrastructure/repositories/messenger.repository";
import { Messenger, createMessenger } from "../entities/messenger.entity";
import { User } from "../entities/user.entity";

type CreateConversationInput = {
  userSessionId: User["sessionId"];
};
type CreateConversationOutput = Messenger;

@Injectable()
export class CreateConversationUseCase {
  constructor(private readonly messengerRepository: MessengerRepository) {}

  async execute(input: CreateConversationInput): Promise<CreateConversationOutput> {
    // NOTE: for the label with can let choose the user, or increment the number of conversations, or even take a part of the message
    const messenger = createMessenger({
      userSessionId: input.userSessionId,
      label: "Chat #x...",
    });
    await this.messengerRepository.create(messenger);
    return messenger;
  }
}
