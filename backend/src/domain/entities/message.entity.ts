import { randomUUID } from "crypto";

export interface Message {
  id: string;
  messengerId: string;
  sender: "user" | "bot";
  createdAt: Date;
}

export const createMessage = (
  message: Partial<Message> & {
    messengerId: Message["messengerId"];
    sender: Message["sender"];
  },
): Message => ({
  id: message.id ?? randomUUID(),

  messengerId: message.messengerId,
  sender: message.sender,

  createdAt: message.createdAt ?? new Date(),
});
