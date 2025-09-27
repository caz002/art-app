import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import fs from "fs"; // Import the fs module
const routesDir = path.resolve(__dirname, "./src/routes");
const tanstackTmpDir = path.resolve(__dirname, "./.tanstack/tmp");
if (!fs.existsSync(routesDir)) {
  fs.mkdirSync(routesDir, { recursive: true });
}

// Ensure the TanStack temporary directory exists
if (!fs.existsSync(tanstackTmpDir)) {
  fs.mkdirSync(tanstackTmpDir, { recursive: true });
}

console.log("Routes Directory:", routesDir);
console.log("Temp Directory:", tanstackTmpDir);
export default defineConfig({
  // root: path.resolve(__dirname),
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: routesDir,
      tmpDir: tanstackTmpDir, // Specify the temporary directory explicitly
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@backend": path.resolve(__dirname, "../backend"),
      "@shared": path.resolve(__dirname, "../shared"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
