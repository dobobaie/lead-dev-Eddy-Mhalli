/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 15000,
    hookTimeout: 60000,
    environment: "node",
    globalSetup: [],
  },
});
