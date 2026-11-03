// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://julinhio.github.io",
  base: "/about-me",
  output: "static",
  // One small stylesheet: inline it to avoid a render-blocking request.
  build: { inlineStylesheets: "always" },
  vite: { plugins: [tailwindcss()] },
});
