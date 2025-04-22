// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: './', // Make sure root points to the correct directory
  build: {
    outDir: 'dist', // Output directory for build
    rollupOptions: {
      input: './index.html', // Explicitly specify the path to the root index.html
      external: ['@turf/turf'], // Add @turf/turf as an external dependency
    }
  }
})
