import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Permite leer el JSON que está en la carpeta data/ de la raíz del proyecto
    fs: { allow: ['..'] },
  },
})
