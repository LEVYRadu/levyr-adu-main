// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // this is usually fine, adjust if needed
  build: {
    outDir: 'dist'
  }
})
