import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "./", // Use relative paths so assets load correctly on Vercel
  build: {
    outDir: "dist", // Build output folder
    rollupOptions: {
      input: {
        // Declare all HTML pages here
        main: resolve(__dirname, "index.html"),
        input: resolve(__dirname, "input.html"),
        page2: resolve(__dirname, "overwrite.html"),
        page3: resolve(__dirname, "reroute.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src", // Optional: lets you import from "@/..." instead of relative paths
    },
  },
});
