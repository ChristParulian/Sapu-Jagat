import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 7000,
    host: "localhost",
    // Tambahkan fallback untuk SPA
    middlewareMode: false,
    fs: { allow: ["."] },
    historyApiFallback: true,
  },
});
