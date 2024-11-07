import { randomUUID } from "crypto";

export interface User {
  id: string;
  name: string;
  sessionId: string;
  createdAt: Date;
}

export const createUser = (
  user: Partial<User> & {
    name: User["name"];
  },
): User => ({
  id: user.id ?? randomUUID(),

  name: user.name,
  sessionId: user.sessionId ?? randomUUID(),

  createdAt: user.createdAt ?? new Date(),
});
