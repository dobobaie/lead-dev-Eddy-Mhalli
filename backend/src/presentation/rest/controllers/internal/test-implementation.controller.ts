import { Controller, Get } from "@nestjs/common";

import { ApiRoute } from "../../decorators/api-route.decorator";

import { TESTImplementationInteractor } from "../../../../domain/interactors/TEST-implementation.interactor";

@Controller("internal")
export class InternalTestImplementationController {
  constructor(
    private readonly testImplementationInteractor: TESTImplementationInteractor,
  ) {}

  @ApiRoute({ summary: "Test implementation" })
  @Get("test")
  async test() {
    await this.testImplementationInteractor.execute();
  }
}
