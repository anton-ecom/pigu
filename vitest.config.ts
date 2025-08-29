import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { envOnlyMacros } from "vite-env-only";

export default defineConfig({
  plugins: [tsconfigPaths(), envOnlyMacros()],
  test: {
    globals: true,
    environment: "node",
    include: ["test/**/*.test.ts"], // Changed to include subdirectories
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
