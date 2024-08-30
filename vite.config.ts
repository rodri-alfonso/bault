import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'React Vite PWA',
        short_name: 'React Vite PWA',
        theme_color: '#000000',
        icons: [
          {
            src: '/favicon.svg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon.svg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
