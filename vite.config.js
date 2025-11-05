import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // ✅ use relative paths so assets resolve correctly on Vercel
  build: {
    outDir: "dist", // ✅ Vercel will serve from this folder
  },
  server: {
    open: true, // optional: auto-open browser when running locally
  },
  resolve: {
    alias: {
      // ✅ optional convenience: so you can use '@/path' instead of long relative imports
      "@": "/src",
    },
  },
});
