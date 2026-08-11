// El cerebro del proyecto: Configuración de Vite para Aplicación Multi-página

import { resolve } from 'path'; // Herramienta para manejar rutas de archivos
import { defineConfig } from 'vite'; // Ayuda con el autocompletado de la configuración

export default defineConfig({
  root: './', // Los archivos fuente están en la carpeta 'src'
  publicDir: 'public', // Archivos estáticos (imágenes, iconos)
  logLevel: 'info', // Muestra mensajes informativos en la consola
  
  build: {
    outDir: 'dist', // Dónde se guardará el proyecto final para subir a internet
    rollupOptions: {
      // Definimos los puntos de entrada para cada página de nuestra web
      input: {
        main: resolve(__dirname, 'index.html'),      // Página principal
        checkout: resolve(__dirname, 'pages/checkout.html'),
        accesorios: resolve(__dirname, 'pages/accesorios.html'),  // Página del carrito
        ofertas: resolve(__dirname, 'pages/ofertas.html'), // Página de pago
        salud: resolve(__dirname, 'pages/salud.html') // Página de salud
      },
    },
  },
});