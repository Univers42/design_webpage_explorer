import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // "@/..." -> "src/..."  (matches the prompt's @/assets imports)
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,         // listen on 0.0.0.0 so the container is reachable
    port: 5176,
    strictPort: true,
    watch: {
      usePolling: true, // reliable file watching across a Docker bind mount
    },
  },
})
