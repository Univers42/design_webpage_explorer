import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,        // listen on 0.0.0.0 so the container is reachable
    port: 5175,
    strictPort: true,
    watch: {
      usePolling: true, // reliable file watching across a Docker bind mount
    },
  },
})
