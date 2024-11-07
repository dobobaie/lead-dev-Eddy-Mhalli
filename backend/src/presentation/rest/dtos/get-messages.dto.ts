import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { Message } from "../../../domain/entities/message.entity";

export class MessengerGetMessagesParamDTO {
  @ApiProperty({ name: "messengerId", type: String })
  @IsString()
  messengerId!: string;
}

class MessageDTO {
  @ApiProperty({ type: String })
  message!: Message["message"];

  @ApiProperty({ type: String })
  sender!: Message["sender"];

  @ApiProperty({ type: Date })
  createdAt!: Message["createdAt"];
}

export class MessengerGetMessagesResponseDTO {
  @ApiProperty({ type: [MessageDTO] })
  messages!: MessageDTO[];
}
