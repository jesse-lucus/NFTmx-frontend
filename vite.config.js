import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: 'util',
      crypto: 'crypto-js',
      fs: 'fs-js',
    }
  },
  define: {
    'process.env': {},
    "global": {}
  },
  // optimizeDeps: {
  //   exclude: [
  //     '@solana/spl-token',
  //     'bs',
  //     'borsh'
  //   ]
  // }
})
