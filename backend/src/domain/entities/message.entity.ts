import { randomUUID } from "crypto";

export interface Message {
  id: string;
  messengerId: string;
  message: string;
  sender: "user" | "assistant";
  createdAt: Date;
}

export const createMessage = (
  message: Partial<Message> & {
    messengerId: Message["messengerId"];
    message: Message["message"];
    sender: Message["sender"];
  },
): Message => ({
  id: message.id ?? randomUUID(),

  messengerId: message.messengerId,
  message: message.message,
  sender: message.sender,

  createdAt: message.createdAt ?? new Date(),
});
