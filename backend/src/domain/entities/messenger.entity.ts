import { randomUUID } from "crypto";

export interface Messenger {
  id: string;
  userId: string;
  label: string;
  createdAt: Date;
}

export const createMessenger = (
  messenger: Partial<Messenger> & {
    userId: Messenger["userId"];
    label: Messenger["label"];
  },
): Messenger => ({
  id: messenger.id ?? randomUUID(),

  userId: messenger.userId,
  label: messenger.label,

  createdAt: messenger.createdAt ?? new Date(),
});
