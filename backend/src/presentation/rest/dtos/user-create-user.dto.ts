import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserCreateUserBodyDTO {
  @ApiProperty({ name: "name", type: String })
  @IsString()
  name!: string;
}

export class UserCreateUserResponseDTO {
  @ApiProperty({ type: String })
  sessionId!: string;
}
