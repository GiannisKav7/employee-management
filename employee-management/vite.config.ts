import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Ensure a single React instance (prevents "Invalid hook call")
    dedupe: ["react", "react-dom"],
  },
});
