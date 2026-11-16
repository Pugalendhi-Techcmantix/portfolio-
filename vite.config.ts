import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // three.js lives in a lazily loaded ToyScene chunk (~265 kB gzip), so a larger limit is expected.
  build: { chunkSizeWarningLimit: 1000 },
})
