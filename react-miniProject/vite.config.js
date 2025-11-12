import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/styles/theme.scss"; //
      `,
      },
    },
  },
  resolve: {
    alias: [
      { find: "@supabase_path", replacement: "/supabase" },
      { find: "@", replacement: "/src" },
      { find: "@apis", replacement: "/src/apis" },
      { find: "@assets", replacement: "/src/assets" },
      { find: "@components", replacement: "/src/components" },
      { find: "@common", replacement: "/src/components/common" },
      { find: "@constants", replacement: "/src/constants" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@lib", replacement: "/src/lib" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@store", replacement: "/src/store" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@utils", replacement: "/src/utils" },
    ],
  },
});
