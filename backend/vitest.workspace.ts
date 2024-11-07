/// <reference types="vitest" />
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "./vitest.config.ts",
    plugins: [
      {
        name: "integration-test",
        config: () => ({
          test: {
            include: ["tests/**/specs/**/*.spec.ts"],
          },
        }),
      },
    ],
  },
]);
