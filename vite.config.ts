import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ghibli-kitchen-viewer/', // <- exakt für GitHub Pages unter aeon022.github.io/ghibli-kitchen-viewer/
  plugins: [react()],
})

