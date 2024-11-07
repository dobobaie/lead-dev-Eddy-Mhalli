import { Module } from "@nestjs/common";

import { PluginsModule } from "../plugins/plugins.module";

import { GrogConnector } from "./connectors/grog";

const modules = [GrogConnector];

@Module({
  imports: [PluginsModule],
  providers: modules,
  exports: modules,
})
export class InfrastructureModule {
  constructor() {}
}
