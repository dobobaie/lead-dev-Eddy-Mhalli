import { Injectable } from "@nestjs/common";

import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { User, createUser } from "../entities/user.entity";

type CreateUserInput = { name: User["name"] };
type CreateUserOutput = User;

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const user = createUser({ name: input.name });
    await this.userRepository.create(user);
    return user;
  }
}
