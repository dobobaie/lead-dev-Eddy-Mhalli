import { ApiProperty } from "@nestjs/swagger";

export class MessengerCreateConversationResponseDTO {
  @ApiProperty({ type: String })
  messengerId!: string;
}
