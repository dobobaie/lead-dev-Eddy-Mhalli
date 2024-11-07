import { Body, Controller, Post } from "@nestjs/common";

import { ApiRoute } from "../../decorators/api-route.decorator";

import { CreateUserUseCase } from "../../../../domain/use-cases/create-user.use-case";
import {
  UserCreateUserBodyDTO,
  UserCreateUserResponseDTO,
} from "../../dtos/user-create-user.dto";

@Controller("user")
export class UserCreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @ApiRoute({
    summary: "Create a new user from his name",
    body: UserCreateUserBodyDTO,
    response: UserCreateUserResponseDTO,
  })
  @Post("create")
  async create(
    @Body() body: UserCreateUserBodyDTO,
  ): Promise<UserCreateUserResponseDTO> {
    const user = await this.createUserUseCase.execute({ name: body.name });
    return { sessionId: user.sessionId };
  }
}
