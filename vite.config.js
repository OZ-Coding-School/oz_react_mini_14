import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@api": "/src/api",
      "@hooks": "/src/hook",
      "@pages": "/src/pages",
      "@CommonStyle": "/src/components/CommonStyle",
    },
  },
});
