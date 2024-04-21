import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@root': path.join(__dirname, './'),
      '@': path.join(__dirname, './src')
    }
  },
  build:{
    chunkSizeWarningLimit: 1024,
  }
})
