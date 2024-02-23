import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import module from "module";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Configuración manualChunks aquí...
        },
      },
    },
  },
});