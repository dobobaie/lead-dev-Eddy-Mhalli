process.on("uncaughtException", (error) => console.error(error));
process.on("unhandledrejection", (error) => console.error(error));

import config from "./config/default";

import { AppModule } from "./app.module";

import { initApplication, initExpress } from "./plugins/nest-express";
import { initDocumentation } from "./plugins/nest-express/documentation";

const startServer = async () => {
  const appName = config.application.name;
  const environment = config.environment;

  console.info(`Service boot: ${appName} - Instance Starting...`);
  console.info(`Service boot: Using ${environment} environment.`);

  let app = await initExpress({ module: AppModule });
  app = initApplication(app);
  initDocumentation(app);

  try {
    const port = config.application.server.port;
    await app.listen(port);
    console.info(`Service boot: ${appName} - Instance Started on port ${port}`);
  } catch (error: any) {
    console.error(`Service boot: ${appName} - Instance Error`, {
      type: "error",
      error: {
        message: error.toString(),
      },
    });
  }
};

startServer();
