import { Injectable } from "@nestjs/common";

import { MessengerRepository } from "../../infrastructure/repositories/messenger.repository";
import { User } from "../entities/user.entity";
import { Messenger } from "../entities/messenger.entity";

type GetMessengerByUserSessionInput = {
  userSessionId: User["sessionId"];
};
type GetMessengerByUserSessionOutput = Messenger[];

@Injectable()
export class GetMessengerByUserSessionUseCase {
  constructor(private readonly messengerRepository: MessengerRepository) {}

  async execute(
    input: GetMessengerByUserSessionInput,
  ): Promise<GetMessengerByUserSessionOutput> {
    const messengers = await this.messengerRepository.findAllByUserSessionId(
      input.userSessionId,
    );
    return messengers;
  }
}
