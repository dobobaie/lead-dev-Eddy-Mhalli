import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class MessengerSendMessageToAssistantBodyDTO {
  @ApiProperty({ name: "messengerId", type: String })
  @IsString()
  messengerId!: string;

  @ApiProperty({ name: "message", type: String })
  @IsString()
  message!: string;
}
