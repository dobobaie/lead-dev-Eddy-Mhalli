import { Controller, Param, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

import { ApiRoute } from "../../decorators/api-route.decorator";
import { UserSessionGuard } from "../../guards/user-session.guard";

import {
  MessengerGetMessagesParamDTO,
  MessengerGetMessagesResponseDTO,
} from "../../dtos/get-messages.dto";
import { GetMessagesByMessengerUseCase } from "../../../../domain/use-cases/get-messages-by-messenger.use-case";

@UseGuards(UserSessionGuard)
@Controller("messenger")
export class MessengerGetMessagesController {
  constructor(
    private readonly getMessagesByMessengerUseCase: GetMessagesByMessengerUseCase,
  ) {}

  @ApiRoute({
    summary: "Get every messages from a messenger",
    response: MessengerGetMessagesResponseDTO,
  })
  @Get(":messengerId/messages")
  async getMessages(
    @Req() request: Request,
    @Param() params: MessengerGetMessagesParamDTO,
  ): Promise<MessengerGetMessagesResponseDTO> {
    const userSessionId = request.headers[UserSessionGuard.field] as string;
    const messages = await this.getMessagesByMessengerUseCase.execute({
      userSessionId,
      messengerId: params.messengerId,
    });

    return {
      messages: messages.map((message) => ({
        message: message.message,
        sender: message.sender,
        createdAt: message.createdAt,
      })),
    };
  }
}
