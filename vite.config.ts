import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "index.js",
    },
    target: "node18",
    minify: false,
    sourcemap: true,
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      external: ["node:fs", "node:path", "node:url", "fs", "path", "url"],
      output: {
        banner: "#!/usr/bin/env node",
      },
    },
  },
});
