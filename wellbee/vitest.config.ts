import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [
    svelte({
      hot: false,
      compilerOptions: { hmr: false, dev: false }
    })
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/setup-tests.ts'],
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});

