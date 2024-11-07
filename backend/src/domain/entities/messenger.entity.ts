import { randomUUID } from "crypto";

export interface Messenger {
  id: string;
  userSessionId: string;
  label: string;
  createdAt: Date;
}

export const createMessenger = (
  messenger: Partial<Messenger> & {
    userSessionId: Messenger["userSessionId"];
    label: Messenger["label"];
  },
): Messenger => ({
  id: messenger.id ?? randomUUID(),

  userSessionId: messenger.userSessionId,
  label: messenger.label,

  createdAt: messenger.createdAt ?? new Date(),
});
