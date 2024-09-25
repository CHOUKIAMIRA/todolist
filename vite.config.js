import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://choukiamira.github.io/todolist/',   // Chemin relatif au dépôt GitHub Pages
  plugins: [react()],
  build: {
    outDir: 'dist'    // Assurez-vous que 'dist' est le dossier de build
  }
})
