import { Controller, Get } from "@nestjs/common";

import { ApiRoute } from "../../decorators/api-route.decorator";
import { AppGetHealthResponseDTO } from "../../dtos/app-get-health.dto";

@Controller()
export class AppGetHealthController {
  constructor() {}

  @ApiRoute({
    summary: "Return the application's health",
    response: AppGetHealthResponseDTO,
  })
  @Get()
  getHealth(): AppGetHealthResponseDTO {
    return { status: "ok" };
  }
}
