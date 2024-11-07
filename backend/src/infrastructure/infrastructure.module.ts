import { Module } from "@nestjs/common";

import { PluginsModule } from "../plugins/plugins.module";

import { GrogConnector } from "./connectors/grog";
import { UserRepository } from "./repositories/user.repository";

const modules = [GrogConnector, UserRepository];

@Module({
  imports: [PluginsModule],
  providers: modules,
  exports: modules,
})
export class InfrastructureModule {
  constructor() {}
}
