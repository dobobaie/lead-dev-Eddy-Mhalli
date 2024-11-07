import { Messenger } from "../entities/messenger.entity";
import { DomainError } from "./domain.error";

type MessengerNotFoundErrorPayload = {
  messengerId: Messenger["id"];
};
export class MessengerNotFoundError extends DomainError<MessengerNotFoundErrorPayload> {
  code = "Messenger_NotFound" as const;

  constructor(readonly payload: MessengerNotFoundErrorPayload) {
    super("Messenger not found", payload);
  }
}
