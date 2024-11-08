import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";

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
    // NOTE: for the label there is different possibilities :
    // let the user choose, increment the number of conversations, or even take a part of the message
    // for the exercise I decided to set a random ID
    const messenger = createMessenger({
      userSessionId: input.userSessionId,
      label: "Chat #" + randomUUID().split("-").shift(),
    });
    await this.messengerRepository.create(messenger);
    return messenger;
  }
}
