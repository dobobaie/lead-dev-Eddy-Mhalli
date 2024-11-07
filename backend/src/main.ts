process.on("uncaughtException", (error) => console.error(error));
process.on("unhandledrejection", (error) => console.error(error));

import * as admin from "firebase-admin";
import path from "path";

import config from "./config/default";

import { AppModule } from "./app.module";

import { initApplication, initExpress } from "./plugins/nest-express/middlewares";
import { NativeLogger } from "./plugins/logger";
import { initDocumentation } from "./plugins/nest-express/documentation";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require(
  path.join(__dirname, "..", config.firebase.credentials.path),
);

const logger = new NativeLogger({ context: "Nest Express Server" });

const startServer = async () => {
  const appName = config.application.name;
  const environment = config.environment;

  logger.info(`Service boot: ${appName} - Instance Starting...`);
  logger.info(`Service boot: Using ${environment} environment.`);

  // Initialize application
  let app = await initExpress({ module: AppModule });
  app = initApplication(app);
  initDocumentation(app);

  // Initialize firebase
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

  try {
    const port = config.application.server.port;
    await app.listen(port);
    logger.info(`Service boot: ${appName} - Instance Started on port ${port}`);
  } catch (error: any) {
    logger.error(`Service boot: ${appName} - Instance Error`, {
      type: "error",
      error: {
        message: error.toString(),
      },
    });
  }
};

startServer();
