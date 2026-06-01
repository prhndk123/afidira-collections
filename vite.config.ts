import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: false,
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
      },
    }),
    {
      name: "force-exit-after-build",
      apply: "build",
      closeBundle() {
        setTimeout(() => process.exit(0), 0);
      },
    },
  ],
});
