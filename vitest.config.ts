/// <reference types="vitest" />
import react from "@vitejs/plugin-react";

import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default defineConfig((configEnv) => {
  const baseConfig = viteConfig({ mode: configEnv.mode });
  return mergeConfig(
    {
      ...baseConfig,
      plugins: [react(), tsconfigPaths()],
    },
    defineConfig({
      test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./test/setup.ts"],
        exclude: [
          "**/tests/**/*.spec.ts",
          "**/tests-examples/**/*.spec.ts",
          "**/node_modules/**",
        ],
        coverage: {
          provider: "v8",
          reporter: ["text", "lcov"],
        },
      },
    }),
  );
});
