/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    VitePWA({ registerType: 'autoUpdate', devOptions: {enabled: false, type: 'module'},workbox: {globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,gif,json,tsx}'],},includeAssets: ["**/*"],
      manifest: {
          "short_name": "Chewlinka App",
          "name": "Chewlinka App",
          "icons": [
            {
              "src": "assets/icon/favicon.png",
              "sizes": "64x64 32x32 24x24 16x16",
              "type": "image/x-icon"
            },
            {
              "src": "assets/icon/icon.png",
              "type": "image/png",
              "sizes": "512x512",
              "purpose": "maskable"
            }
          ],
          "start_url": ".",
          "display": "standalone",
          "theme_color": "#ffffff",
          "background_color": "#ffffff"
        }
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
