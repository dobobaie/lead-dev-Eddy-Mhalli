import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";

import { ApiRoute } from "../../decorators/api-route.decorator";
import { UserSessionGuard } from "../../guards/user-session.guard";

import { SendMessageToAssistantUseCase } from "../../../../domain/use-cases/send-message-to-assistant.use-case";
import { MessengerSendMessageToAssistantBodyDTO } from "../../dtos/messenger-send-message-to-assistant.dto";

@UseGuards(UserSessionGuard)
@Controller("messenger")
export class MessengerSendMessageToAssistantController {
  constructor(
    private readonly sendMessageToAssistant: SendMessageToAssistantUseCase,
  ) {}

  @ApiRoute({
    summary: "Create a new conversation",
    body: MessengerSendMessageToAssistantBodyDTO,
    contentType: "text/event-stream",
    responseType: "string",
  })
  @Post("create")
  async create(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: MessengerSendMessageToAssistantBodyDTO,
  ): Promise<void> {
    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Connection", "keep-alive");

    const userSessionId = request.headers[UserSessionGuard.field] as string;
    const stream = await this.sendMessageToAssistant.execute({
      userSessionId,
      messengerId: body.messengerId,
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
