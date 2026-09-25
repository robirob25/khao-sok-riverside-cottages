// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://robirob25.github.io',
  base: process.env.BASE_PATH || '/',
  compressHTML: true,
  image: {
    // Astro's built-in Sharp image service for automatic WebP/AVIF
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    // Default quality for optimized images
    defaultWidth: 1200,
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Better chunking for long-term caching
      rollupOptions: {
        output: {
          // Separate CSS and JS for better caching
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
      // Inline small assets as base64 (< 4kb)
      assetsInlineLimit: 4096,
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Minify with esbuild (fastest)
      minify: 'esbuild',
    },
    // Optimize deps
    optimizeDeps: {
      exclude: [],
    },
  },
  trailingSlash: 'always',
});

