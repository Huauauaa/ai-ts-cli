import { defineConfig } from "vite";

export default defineConfig({
  build: {
    ssr: "src/index.ts",
    target: "node18",
    minify: false,
    sourcemap: true,
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        format: "es",
        entryFileNames: "index.js",
        banner: "#!/usr/bin/env node",
      },
    },
  },
});
