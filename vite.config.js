import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        impressum: resolve(__dirname, 'impressum.html'),
        impressumDe: resolve(__dirname, 'impressum-de.html'),
        impressumEs: resolve(__dirname, 'impressum-es.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        privacyDe: resolve(__dirname, 'privacy-de.html'),
        privacyEs: resolve(__dirname, 'privacy-es.html'),
        error404: resolve(__dirname, '404.html')
      },
      output: {
        manualChunks: {
          'chart': ['chart.js/auto'],
          'vendor': ['./src/i18n/i18n.js', './src/i18n/translations.js']
        }
      }
    }
  }
})