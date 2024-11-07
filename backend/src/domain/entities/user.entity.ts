import { randomUUID } from "crypto";

export interface User {
  id: string;
  name: string;
  sessionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const createUser = (
  user: Partial<User> & {
    name: User["name"];
    sessionId: User["sessionId"];
  },
): User => ({
  id: user.id ?? randomUUID(),

  name: user.name,
  sessionId: user.sessionId,

  createdAt: user.createdAt ?? new Date(),
  updatedAt: user.updatedAt ?? new Date(),
});
