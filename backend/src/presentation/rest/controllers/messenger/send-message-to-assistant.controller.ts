import { Body, Controller, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";

import { ApiRoute } from "../../decorators/api-route.decorator";
import { UserSessionGuard } from "../../guards/user-session.guard";

import { SendMessageToAssistantUseCase } from "../../../../domain/use-cases/send-message-to-assistant.use-case";
import {
  MessengerSendMessageToAssistantBodyDTO,
  MessengerSendMessageToAssistantParamDTO,
} from "../../dtos/messenger-send-message-to-assistant.dto";

@UseGuards(UserSessionGuard)
@Controller("messenger")
export class MessengerSendMessageToAssistantController {
  constructor(
    private readonly sendMessageToAssistant: SendMessageToAssistantUseCase,
  ) {}

  @ApiRoute({
    summary: "Create a new conversation",
    body: MessengerSendMessageToAssistantBodyDTO,
    responseContentType: "text/event-stream",
    responseType: "string",
  })
  @Post(":messengerId/send-message")
  async sendMessage(
    @Req() request: Request,
    @Res() response: Response,
    @Param() params: MessengerSendMessageToAssistantParamDTO,
    @Body() body: MessengerSendMessageToAssistantBodyDTO,
  ): Promise<void> {
    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Connection", "keep-alive");

    const userSessionId = request.headers[UserSessionGuard.field] as string;
    const stream = await this.sendMessageToAssistant.execute({
      userSessionId,
      messengerId: params.messengerId,
      message: body.message,
    });

    // NOTE: Stream to client
    const writableStream = new WritableStream({
      write(chunk) {
        response.write(chunk);
      },
      close() {
        response.end();
      },
    });
    await stream.pipeTo(writableStream);
  }
}
