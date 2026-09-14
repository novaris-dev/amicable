import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'public/assets',   // Vite only manages this folder
    assetsDir: '',             // no extra nesting
    manifest: 'manifest.json', // lives at public/assets/manifest.json
    emptyOutDir: true,         // cleans old CSS/JS on each build
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'resources/js/app.js'),
        screen: path.resolve(__dirname, 'resources/scss/screen.scss'),
      },
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: ({ name }) =>
          name && name.endsWith('.css')
            ? 'css/[name]-[hash][extname]'
            : 'media/[name]-[hash][extname]',
      },
    },
  },
});