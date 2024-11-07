import { Module } from "@nestjs/common";

import { PluginsModule } from "../plugins/plugins.module";

import { GrogConnector } from "./connectors/grog";
import { UserRepository } from "./repositories/user.repository";
import { MessengerRepository } from "./repositories/messenger.repository";
import { MessageRepository } from "./repositories/message.repository";

const modules = [
  GrogConnector,
  UserRepository,
  MessengerRepository,
  MessageRepository,
];

@Module({
  imports: [PluginsModule],
  providers: modules,
  exports: modules,
})
export class InfrastructureModule {
  constructor() {}
}
