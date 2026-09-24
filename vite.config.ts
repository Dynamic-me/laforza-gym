import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    outDir: new URL('./dist', import.meta.url).pathname,
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: 'localhost',
    strictPort: false,
  },
  preview: {
    port: 4173,
    host: 'localhost',
  },
});