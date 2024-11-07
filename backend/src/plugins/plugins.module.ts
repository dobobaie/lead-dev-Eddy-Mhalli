import { Module } from "@nestjs/common";

const modules = [];

@Module({
  providers: modules,
  exports: modules,
})
export class PluginsModule {}
