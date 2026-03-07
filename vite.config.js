import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          i18n: [
            './src/scripts/i18n/en.js',
            './src/scripts/i18n/pt.js',
            './src/scripts/i18n/es.js',
            './src/scripts/i18n/zh.js',
            './src/scripts/i18n/engine.js'
          ]
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
