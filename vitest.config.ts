import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@site': path.resolve(__dirname),
      '@theme-original': path.resolve(__dirname, 'src/theme'),
      '@theme': path.resolve(__dirname, 'src/theme'),
      '@docusaurus/theme-common': path.resolve(__dirname, 'tests/__mocks__/docusaurus.ts'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
});
