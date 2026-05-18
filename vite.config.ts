import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** GitHub Pages 子路径部署在 CI 里通过 VITE_BASE 注入，例如 `/repo-name/`；本地开发默认 `/`。 */
const base = process.env.VITE_BASE?.trim() || "/";

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 5173,
    host: "127.0.0.1",
    strictPort: false,
  },
});
