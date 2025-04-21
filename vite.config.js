import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/*.ttf', // Копируем все шрифты TTF
          dest: 'assets',
        },
        {
          src: 'src/assets/*.png', // Копируем все изображения PNG
          dest: 'assets',
        },
      ],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://158.160.155.123:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})


