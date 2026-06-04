// El cerebro del proyecto: Configuración de Vite para Aplicación Multi-página

import { resolve } from 'path'; // Herramienta para manejar rutas de archivos
import { defineConfig } from 'vite'; // Ayuda con el autocompletado de la configuración

export default defineConfig({
  root: 'src/', // Los archivos fuente están en la carpeta 'src'
  publicDir: 'public', // Archivos estáticos (imágenes, iconos)
  logLevel: 'info', // Muestra mensajes informativos en la consola
  
  build: {
    outDir: '../dist', // Dónde se guardará el proyecto final para subir a internet
    rollupOptions: {
      // Definimos los puntos de entrada para cada página de nuestra web
      input: {
        main: resolve(__dirname, 'src/index.html'),      // Página principal
        cart: resolve(__dirname, 'src/cart/index.html'),  // Página del carrito
        checkout: resolve(__dirname, 'src/checkout/index.html') // Página de pago
      },
    },
  },
});