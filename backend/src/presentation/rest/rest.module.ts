import { Module } from "@nestjs/common";

import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { PluginsModule } from "../../plugins/plugins.module";
import { DomainModule } from "../../domain/domain.module";

import { AppGetHealthController } from "./controllers/app/get-health.controller";
import { InternalTestImplementationController } from "./controllers/internal/test-implementation.controller";

@Module({
  imports: [PluginsModule, InfrastructureModule, DomainModule],
  controllers: [AppGetHealthController, InternalTestImplementationController],
})
export class RestModule {}
