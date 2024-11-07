import { Module } from "@nestjs/common";

import { AppGetHealthController } from "./controllers/app/get-health.controller";

@Module({
  imports: [],
  controllers: [AppGetHealthController],
})
export class RestModule {}
