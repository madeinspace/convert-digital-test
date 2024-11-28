import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enable global variables like `describe` and `it`
    environment: "jsdom", // Set the test environment to `jsdom` for DOM testing
    setupFiles: "./src/test/setup.ts", // Optional: Path to setup file for additional configurations
  },
});
