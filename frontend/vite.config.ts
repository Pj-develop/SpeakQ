import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import commonjs from 'vite-plugin-commonjs'
import path from "path"

export default defineConfig({
  server: {
    host: true, // Expose the server to external access
    port: 5173, // Specify the port if needed
  },
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
  
  
})
