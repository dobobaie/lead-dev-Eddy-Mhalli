import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";

import { Message } from "../../domain/entities/message.entity";
import { fromFirebaseDate } from "../utils/firebase.util";
import { ModelRepository } from "../types/model-repository.type";

@Injectable()
export class MessageRepository {
  private readonly collection = "Message" as const;

  public async create(message: Message): Promise<void> {
    await admin.firestore().collection(this.collection).add(message);
  }

  public async update(message: Message): Promise<void> {
    await admin
      .firestore()
      .collection(this.collection)
      .where("id", "==", message.id)
      .get()
      .then((snapshot) =>
        Promise.all(
          snapshot.docs.map((document) =>
            admin
              .firestore()
              .collection(this.collection)
              .doc(document.id)
              .update(message as ModelRepository<Message>),
          ),
        ),
      );
  }

  public async findAllByMessenger(messengerId: string): Promise<Message[]> {
    return admin
      .firestore()
      .collection(this.collection)
      .where("messengerId", "==", messengerId)
      .get()
      .then((snapshot) =>
        snapshot.docs.map((document) =>
          this.modelToEntity({
            id: document.id,
            ...document.data(),
          }),
        ),
      );
  }

  private modelToEntity(model: ModelRepository<Message>): Message {
    return {
      id: model.id,

      messengerId: model.messengerId ?? "",
      message: model.message ?? "",
      sender: model.sender ?? "assistant",

      createdAt: model.createdAt ? fromFirebaseDate(model.createdAt) : new Date(),
    };
  }
}
