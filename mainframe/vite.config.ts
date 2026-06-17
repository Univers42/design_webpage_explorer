import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // listen on 0.0.0.0 so the container is reachable
    port: 5174,
    strictPort: true,
    watch: {
      usePolling: true, // reliable file watching across a Docker bind mount
    },
  },
})
