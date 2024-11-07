import { User } from "../entities/user.entity";
import { UserCreateUserBodyDTO } from "../sdks/sdk-api";
import { Repository } from "./repository";

export class UserRepository extends Repository {
  public async createUser(input: UserCreateUserBodyDTO): Promise<User> {
    const result = await this.getSdk().userCreateUserControllerCreate({
      userCreateUserBodyDTO: input,
    });

    const user = Object.assign({ name: input.name }, result);
    return user;
  }
}

export default new UserRepository();
