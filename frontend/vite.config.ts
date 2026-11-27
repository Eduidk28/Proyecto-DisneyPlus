import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Necesario para GitHub Pages: el sitio vive en /Proyecto-DisneyPlus/
  base: '/Proyecto-DisneyPlus/',
  server: {
    // Permite leer el JSON que está en la carpeta data/ de la raíz del proyecto
    fs: { allow: ['..'] },
  },
})