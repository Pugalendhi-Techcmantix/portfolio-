import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Listen on all network interfaces so other devices on the same Wi-Fi/LAN can open the site.
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
  // three.js lives in a lazily loaded ToyScene chunk (~265 kB gzip), so a larger limit is expected.
  build: { chunkSizeWarningLimit: 1000 },
})
