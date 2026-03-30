import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Update 'base' to match your GitHub repo name for deployment
  // Example: base: '/your-repo-name/'
  base: '/SimpleSavory-React/',
})
