import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
      '@components': fileURLToPath(
        new URL('./src/components', import.meta.url)
      ),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
    },
  },
});
