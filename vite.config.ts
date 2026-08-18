import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5211,
    strictPort: true,
    hmr: true,
    watch: {
      ignored: ["**/node_modules/**", "**/dist/**"],
    },
  },
  preview: {
    host: "127.0.0.1",
    port: 4174,
    strictPort: true,
  },
});
