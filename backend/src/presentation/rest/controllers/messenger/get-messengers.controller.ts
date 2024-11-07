import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

import { ApiRoute } from "../../decorators/api-route.decorator";
import { UserSessionGuard } from "../../guards/user-session.guard";

import { MessengerGetMessengersResponseDTO } from "../../dtos/get-messengers.dto";
import { GetMessengerByUserSessionUseCase } from "../../../../domain/use-cases/get-messengers-by-user-session.use-case";

@UseGuards(UserSessionGuard)
@Controller("messenger")
export class MessengerGetMessengersController {
  constructor(
    private readonly getMessengerByUserSessionUseCase: GetMessengerByUserSessionUseCase,
  ) {}

  @ApiRoute({
    summary: "Get every messengers",
    response: MessengerGetMessengersResponseDTO,
  })
  @Get("all")
  async getMessengers(
    @Req() request: Request,
  ): Promise<MessengerGetMessengersResponseDTO> {
    const userSessionId = request.headers[UserSessionGuard.field] as string;
    const messengers = await this.getMessengerByUserSessionUseCase.execute({
      userSessionId,
    });

    return {
      messengers: messengers.map((messenger) => ({
        id: messenger.id,
        label: messenger.label,
        createdAt: messenger.createdAt,
      })),
    };
  }
}
