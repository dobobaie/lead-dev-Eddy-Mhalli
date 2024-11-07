import { Injectable } from "@nestjs/common";
import Groq from "groq-sdk";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

import config from "../../../config/default";

@Injectable()
export class GrogConnector {
  private sdk: Groq;

  constructor() {
    this.sdk = new Groq({ apiKey: config.llm.grog.api.key });
  }

  public async getAssistantReply(
    messages: ChatCompletionMessageParam[],
  ): Promise<ReadableStream> {
    const chat = await this.sdk.chat.completions.create({
      messages,
      model: "llama3-8b-8192",
      stream: true,
    });

    const stream = chat.toReadableStream();
    // return stream;

    // ---
    const reader = stream.getReader();
    reader!.read().then(function pump({ done, value }) {
      if (done) {
        return;
      }

      const message = JSON.parse(new TextDecoder().decode(value));
      console.log(message.choices.map(({ delta }) => delta.content).join(""));
      return reader!.read().then(pump);
    });
    // ---

    return stream;
  }
}
