import { Controller, Post, Req, UseGuards } from "@nestjs/common";

import { ApiRoute } from "../../decorators/api-route.decorator";
import { UserSessionGuard } from "../../guards/user-session.guard";

import { CreateConversationUseCase } from "../../../../domain/use-cases/create-conversation.use-case";
import { MessengerCreateConversationResponseDTO } from "../../dtos/messenger-create-conversation.dto";

@UseGuards(UserSessionGuard)
@Controller("messenger")
export class MessengerCreateConversationController {
  constructor(
    private readonly createConversationUseCase: CreateConversationUseCase,
  ) {}

  @ApiRoute({
    summary: "Create a new conversation",
    response: MessengerCreateConversationResponseDTO,
  })
  @Post("create")
  async create(
    @Req() request: Request,
  ): Promise<MessengerCreateConversationResponseDTO> {
    const userSessionId = request.headers[UserSessionGuard.field];
    const messenger = await this.createConversationUseCase.execute({
      userSessionId,
    });
    return { messengerId: messenger.id };
  }
}
