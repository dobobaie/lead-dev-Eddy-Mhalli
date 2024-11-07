import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class MessengerSendMessageToAssistantParamDTO {
  @ApiProperty({ name: "messengerId", type: String })
  @IsString()
  messengerId!: string;
}

export class MessengerSendMessageToAssistantBodyDTO {
  @ApiProperty({ name: "message", type: String })
  @IsString()
  message!: string;
}
