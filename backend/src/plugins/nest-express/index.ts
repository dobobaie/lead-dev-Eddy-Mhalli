import * as bodyParser from "body-parser";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import config from "../../config/default";

export function initApplication(
  app: NestExpressApplication,
): NestExpressApplication {
  initializeMiddleware(app);
  initializePipes(app);
  initializeCors(app);
  catchUnhandledRejections(app);
  return app;
}

function initializeMiddleware(app: NestExpressApplication) {
  app.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));
  app.use(bodyParser.json({ limit: "15mb" }));
}

function initializeCors(app: NestExpressApplication) {
  app.enableCors({
    credentials: true,
    preflightContinue: true,
    origin: config.application.server.cors.allowedDomains,
    allowedHeaders: config.application.server.cors.allowedHeaders,
    methods: config.application.server.cors.allowedHttpMethod,
  });
}

function initializePipes(app: NestExpressApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
}

function catchUnhandledRejections(app: NestExpressApplication) {
  app.enableShutdownHooks(["unhandledRejection", "SIGINT", "SIGTERM"]);
  // ---
  const gracefulExit = () => {
    console.warn(`Service boot: ${config.application.name} - Instance Shutdown`);
    if (app?.close) {
      app.close();
    }
    process.exit();
  };
  process.on("SIGINT", gracefulExit).on("SIGTERM", gracefulExit);
}

export const initExpress = async ({ module }) => {
  const expressApp = new ExpressAdapter();
  const app = await NestFactory.create<NestExpressApplication>(module, expressApp);
  return app;
};