import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";

import { Messenger } from "../../domain/entities/messenger.entity";
import { fromFirebaseDate } from "../utils/firebase.util";
import { ModelRepository } from "../types/model-repository.type";

@Injectable()
export class MessengerRepository {
  private readonly collection = "Messenger" as const;

  public async create(messenger: Messenger): Promise<void> {
    await admin.firestore().collection(this.collection).add(messenger);
  }

  public async update(messenger: Messenger): Promise<void> {
    await admin
      .firestore()
      .collection(this.collection)
      .where("id", "==", messenger.id)
      .get()
      .then((snapshot) =>
        Promise.all(
          snapshot.docs.map((document) =>
            admin
              .firestore()
              .collection(this.collection)
              .doc(document.id)
              .update(messenger as ModelRepository<Messenger>),
          ),
        ),
      );
  }

  public async find(id: string): Promise<Messenger | null> {
    return admin
      .firestore()
      .collection(this.collection)
      .where("id", "==", id)
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

  private modelToEntity(model: ModelRepository<Messenger>): Messenger {
    return {
      id: model.id,

      userSessionId: model.userSessionId ?? "",
      label: model.label ?? "",

      createdAt: model.createdAt ? fromFirebaseDate(model.createdAt) : new Date(),
    };
  }
}
