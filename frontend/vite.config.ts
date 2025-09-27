import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
// const routesDir = path.resolve(__dirname, './src/routes');
// if (!fs.existsSync(routesDir)) {
//   fs.mkdirSync(routesDir, { recursive: true });
// }
// console.log('Routes Directory:', routesDir);
export default defineConfig({
  // root: path.resolve(__dirname),
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      // routesDirectory: path.resolve(__dirname, "./src/routes"), // 👈 This is the fix
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
