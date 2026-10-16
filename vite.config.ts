import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // The site is served from https://daninithi.github.io/Portfolio/ (GitHub Pages),
  // so every built file path starts with /Portfolio/
  base: '/Portfolio/',
  plugins: [react()],
})
