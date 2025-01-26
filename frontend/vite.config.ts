import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import commonjs from 'vite-plugin-commonjs'
import path from "path"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    devSourcemap: true,
  },
  build: {
    rollupOptions: {
      output: {
        format: 'es', // Ensures ES module output
      },
    },
  },
  server: {
    proxy: {
      '/random.RandomService': {
        target: 'http://localhost:8080', // Your gRPC server address
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
})
