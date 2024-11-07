import { config as dotenvConfig } from "dotenv";
import { cleanEnv, port, str, json, bool } from "envalid";

import { ApplicationService, applicationServices } from "./constants";
import { InternalError } from "../common/errors/internal.error";

const nodeEnv = process.env.NODE_ENV ?? "";

const isTest = ["test"].includes(nodeEnv);
const isDevelopment = "development" === nodeEnv;
if (isDevelopment || isTest) {
  dotenvConfig();
}

const getProcessEnv = () => {
  const processEnv = cleanEnv(
    process.env,
    {
      NODE_ENV: str(),

      // Logs
      LOGGER_CONSOLE_LEVEL: str({ default: "info" }),
      LOGGER_CONSOLE_SILENT: bool({ default: false }),

      // Application
      APPLICATION_NAME: str({
        default: `backend-${process.env.APPLICATION_SERVICE_NAME}`,
      }),
      APPLICATION_SERVER_PORT: port({ default: 3001 }),
      APPLICATION_SERVER_CORS_ALLOWED_HTTP_METHOD: json<string[]>({
        default: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
      }),
      APPLICATION_SERVER_CORS_ALLOWED_HEADERS: json<string[]>({
        default: ["Content-Type", "origin", "cookie"],
      }),
      APPLICATION_SERVICE_NAME: str<ApplicationService>({
        choices: applicationServices,
      }),

      // Connectors
      LLM_GROG_API_KEY: str(),

      // Firebase
      FIREBASE_CREDENTIALS_PATH: str(),
    },
    {
      reporter: ({ errors }) => {
        if (Object.keys(errors).length === 0) {
          return;
        }
        throw new InternalError("Invalid environment variables", errors);
      },
    },
  );

  return processEnv;
};

const processEnv = getProcessEnv();
export type ProcessEnv = typeof processEnv;

export const loadConfig = (processEnv: ProcessEnv) => {
  const config = {
    environment: processEnv.NODE_ENV,
    isDevelopment,
    isTest,
    logger: {
      console: {
        silent: processEnv.LOGGER_CONSOLE_SILENT,
        level: ["staging", "production"].includes(nodeEnv)
          ? "none"
          : processEnv.LOGGER_CONSOLE_LEVEL,
      },
    },
    application: {
      name: processEnv.APPLICATION_NAME,
      service: {
        name: processEnv.APPLICATION_SERVICE_NAME,
      },
      server: {
        port: processEnv.APPLICATION_SERVER_PORT,
        cors: {
          allowedDomains: undefined,
          allowedHttpMethod: processEnv.APPLICATION_SERVER_CORS_ALLOWED_HTTP_METHOD,
          allowedHeaders: processEnv.APPLICATION_SERVER_CORS_ALLOWED_HEADERS,
        },
      },
    },
    llm: {
      grog: {
        api: {
          key: processEnv.LLM_GROG_API_KEY,
        },
      },
    },
    firebase: {
      credentials: {
        path: processEnv.FIREBASE_CREDENTIALS_PATH,
      },
    },
  };

  return config;
};

const config = loadConfig(processEnv);
export default config;
export type Config = typeof config;
