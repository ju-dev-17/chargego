import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "192.168.109.100", // 192.168.178.43
    https: {
      key: "./certs/localhost-key.pem",
      cert: "./certs/localhost.pem",
    },
  },
});
