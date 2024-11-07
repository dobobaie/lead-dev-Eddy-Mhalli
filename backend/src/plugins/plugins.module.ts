import { Module } from '@nestjs/common';

import { Logger } from './logger';

const modules = [Logger];

@Module({
  providers: modules,
  exports: modules,
})
export class PluginsModule {}
