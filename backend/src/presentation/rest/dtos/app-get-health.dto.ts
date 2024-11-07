import { ApiProperty } from "@nestjs/swagger";

export class AppGetHealthResponseDTO {
  @ApiProperty({ type: String })
  status!: "ok" | "ko";
}
