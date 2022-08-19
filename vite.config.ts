import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    open: '/',
    // port: 8000,
    https: false,
    proxy: {},
  }, css: {
    /* CSS 预处理器 */
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "src/assets/styles/var.scss";'
        resolve: {
          alias: {
            '@': resolve(__dirname, './src')
          }
        }
      }
    }
  },

})
