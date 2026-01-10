import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  base: '/ghibli-kitchen-viewer/', // GitHub Pages unter aeon022.github.io/ghibli-kitchen-viewer/
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})