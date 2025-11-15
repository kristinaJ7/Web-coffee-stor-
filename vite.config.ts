import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['./src/scss'],
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',          
        info: 'info.html',         
      },
    },
  },
});
