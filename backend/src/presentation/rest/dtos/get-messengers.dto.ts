import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { Messenger } from "../../../domain/entities/messenger.entity";

export class MessengerGetMessengersParamDTO {
  @ApiProperty({ name: "messengerId", type: String })
  @IsString()
  messengerId!: string;
}

class MessengerDTO {
  @ApiProperty({ type: String })
  id!: Messenger["id"];

  @ApiProperty({ type: String })
  label!: Messenger["label"];

  @ApiProperty({ type: Date })
  createdAt!: Messenger["createdAt"];
}

export class MessengerGetMessengersResponseDTO {
  @ApiProperty({ type: [MessengerDTO] })
  messengers!: MessengerDTO[];
}
