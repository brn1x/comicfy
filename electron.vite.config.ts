import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@main': resolve('src/main'),
        '@renderer': resolve('src/renderer/src'),
        '@components': resolve('src/renderer/src/components'),
        '@context': resolve('src/renderer/src/context'),
        '@pages': resolve('src/renderer/src/pages'),
        '@assets': resolve('src/renderer/src/assets')
      }
    },
    plugins: [react(), svgr({ include: '**/*.svg' })]
  }
})
