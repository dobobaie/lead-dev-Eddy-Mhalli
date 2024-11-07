import { Module } from "@nestjs/common";

import { PluginsModule } from "../plugins/plugins.module";
import { InfrastructureModule } from "../infrastructure/infrastructure.module";

import { TESTImplementationInteractor } from "./interactors/TEST-implementation.interactor";

const modules = [TESTImplementationInteractor];

@Module({
  imports: [PluginsModule, InfrastructureModule],
  providers: modules,
  exports: modules,
})
export class DomainModule {
  constructor() {}
}
