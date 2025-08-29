import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { envOnlyMacros } from "vite-env-only";

export default defineConfig({
  plugins: [envOnlyMacros(), reactRouter(), tsconfigPaths()],
  // Prevent multiple React copies during dev / HMR which can cause
  // "dispatcher is null" errors when hooks are invoked.
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  server: {
    port: 3012,
    open: false,
    allowedHosts: true,
  },
});
