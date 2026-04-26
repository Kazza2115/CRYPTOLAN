import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env['GITHUB_PAGES'] === 'true' ? '/CRYPTOLAN/' : '/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2022',
  },
});
