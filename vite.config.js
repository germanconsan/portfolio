// vite.config.js
import { defineConfig } from 'vite';
import gltf from 'vite-plugin-gltf';

export default defineConfig({
  root: 'src', // La carpeta de entrada
  build: {
    outDir: '../dist', // La carpeta de salida para la construcción
  },
  plugins: [gltf()], // Agregar el plugin GLTF aquí
});