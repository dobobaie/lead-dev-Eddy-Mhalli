import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";

import { User } from "../../domain/entities/user.entity";
import { fromFirebaseDate } from "../utils/firebase.util";
import { ModelRepository } from "../types/model-repository.type";

@Injectable()
export class UserRepository {
  private readonly collection = "User" as const;

  public async create(user: User): Promise<void> {
    await admin.firestore().collection(this.collection).add(user);
  }

  public async update(user: User): Promise<void> {
    await admin
      .firestore()
      .collection(this.collection)
      .where("id", "==", user.id)
      .get()
      .then((snapshot) =>
        Promise.all(
          snapshot.docs.map((document) =>
            admin
              .firestore()
              .collection(this.collection)
              .doc(document.id)
              .update(user as ModelRepository<User>),
          ),
        ),
      );
  }

  public async findBySessionId(sessionId: string): Promise<User | null> {
    return admin
      .firestore()
      .collection(this.collection)
      .where("sessionId", "==", sessionId)
      .get()
      .then((snapshot) =>
        snapshot.docs.map((document) =>
          this.modelToEntity({
            id: document.id,
            ...document.data(),
          }),
        ),
      )
      .then((documents) => documents.shift() ?? null);
  }

  private modelToEntity(model: ModelRepository<User>): User {
    return {
      id: model.id,

      name: model.name ?? "",
      sessionId: model.sessionId ?? "",

      createdAt: model.createdAt ? fromFirebaseDate(model.createdAt) : new Date(),
    };
  }
}
