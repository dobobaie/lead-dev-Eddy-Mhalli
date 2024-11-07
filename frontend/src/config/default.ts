import { cleanEnv, str, url } from "envalid";

import { ApplicationService, applicationServices } from "./constants";

const nodeEnv = process.env.NODE_ENV ?? "";
const isDevelopment = "development" === nodeEnv;

export let applicationErrors: Record<string, Error>[] = [];

const getProcessEnv = () => {
  const processEnv = cleanEnv(
    process.env,
    {
      NODE_ENV: str(),

      // Application
      REACT_APP_APPLICATION_NAME: str({
        default: `frontend-${process.env.REACT_APP_APPLICATION_SERVICE_NAME}`,
      }),
      REACT_APP_APPLICATION_SERVICE_NAME: str<ApplicationService>({
        choices: applicationServices,
      }),

      // Services
      REACT_APP_SERVICES_PUBLIC_API_URL: url(),
    },
    {
      reporter: ({ errors }) => {
        if (Object.keys(errors).length === 0) {
          return;
        }

        if (isDevelopment) {
          console.error(
            "An error occurred while loading environment variables",
            { errors }
          );
        }

        applicationErrors = errors as typeof applicationErrors;
      },
    }
  );

  return processEnv;
};

const processEnv = getProcessEnv();
export type ProcessEnv = typeof processEnv;

export const loadConfig = (processEnv: ProcessEnv) => {
  const config = {
    environment: processEnv.NODE_ENV,
    isDevelopment,
    application: {
      name: processEnv.REACT_APP_APPLICATION_NAME,
      service: {
        name: processEnv.REACT_APP_APPLICATION_SERVICE_NAME,
      },
    },
    services: {
      public_api: {
        url: processEnv.REACT_APP_SERVICES_PUBLIC_API_URL,
      },
    },
  };

  return config;
};

const config = loadConfig(processEnv);
export default config;
export type Config = typeof config;
