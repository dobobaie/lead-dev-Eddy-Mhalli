import { Module } from "@nestjs/common";

import { PluginsModule } from "../plugins/plugins.module";
import { InfrastructureModule } from "../infrastructure/infrastructure.module";

import { CreateUserUseCase } from "./use-cases/create-user.use-case";
import { CreateConversationUseCase } from "./use-cases/create-conversation.use-case";
import { SendMessageToAssistantUseCase } from "./use-cases/send-message-to-assistant.use-case";
import { GetMessagesByMessengerUseCase } from "./use-cases/get-messages-by-messenger.use-case";

const modules = [
  CreateUserUseCase,
  CreateConversationUseCase,
  GetMessagesByMessengerUseCase,
  SendMessageToAssistantUseCase,
];

@Module({
  imports: [PluginsModule, InfrastructureModule],
  providers: modules,
  exports: modules,
})
export class DomainModule {
  constructor() {}
}
