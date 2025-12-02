import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy frontend calls that start with /encounter/api to the backend
      // and rewrite the path to match backend routes (prefix /v1/user)
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
