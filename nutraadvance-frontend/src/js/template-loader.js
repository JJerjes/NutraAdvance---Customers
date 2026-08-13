// //  FUNCIÓN loadComponent
// //  Propósito: Descarga un archivo HTML externo (como un partial) y lo inyecta
// //  dentro de un contenedor específico en la página actual.
 
// async function loadComponent(targetContainer, filePath) {
//   try {
//     const response = await fetch(filePath);
//     if (!response.ok) throw new Error(`No se pudo cargar ${filePath}`);
//     const data = await response.text();
//     document.getElementById(targetContainer).innerHTML = data;

//   } catch (error) {
//     console.error('Error: ', error);
//   }
// }

// loadComponent('main-header', 'nutraadvance-frontend/src/public/partials/header.html');
// loadComponent('main-content', 'nutraadvance-frontend/src/public/partials/main-hero.html');
// loadComponent('main-footer', 'nutraadvance-frontend/src/public/partials/footer.html');


// //TOQUE INTERACTIVO
// function initCardInteractions() {
//   const cards = document.querySelectorAll('#card');

//   cards.forEach(card => {
//     card.addEventListener('click', () => {
//       const category = card.querySelector('h3').innerText;
//       console.log(`Navegando a: ${category}`);
//     });
//   });
// }

// document.addEventListener('DOMContentLoaded', () => {
//   initCardInteractions();
// })










// FUNCIÓN loadComponent
// Propósito: Descarga un archivo HTML externo y lo inyecta en un contenedor.
export async function loadComponent(targetContainer, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`No se pudo cargar ${filePath}`);
    const data = await response.text();
    const container = document.getElementById(targetContainer);
    if (container) {
      container.innerHTML = data;
    }
  } catch (error) {
    console.error('Error: ', error);
  }
}

// Carga inicial de componentes estáticos y contenido por defecto
document.addEventListener('DOMContentLoaded', async () => {
  // Estas rutas ya sabemos que te funcionan bien al iniciar:
  await loadComponent('main-header', '/nutraadvance-frontend/src/public/partials/header.html');
  await loadComponent('main-content', '/nutraadvance-frontend/src/public/partials/main-hero.html'); 
  await loadComponent('main-footer', '/nutraadvance-frontend/src/public/partials/cart-modal.html');
  await loadComponent('main-footer', '/nutraadvance-frontend/src/public/partials/footer.html');


  const path = window.location.pathname;

  if (path.includes('salud.html')) {
    await loadComponent('main-content', '/nutraadvance-frontend/pages/salud.html');
    const { loadProducts } = await import('/nutraadvance-frontend/src/js/catalogo.js');
    loadProducts('/nutraadvance-frontend/src/public/json/salud.json');
  } else if (path.includes('accesorios.html')) {
    await loadComponent('main-content', '/nutraadvance-frontend/pages/accesorios.html');
    const { loadProducts } = await import('/nutraadvance-frontend/src/js/catalogo.js');
    loadProducts('/nutraadvance-frontend/src/public/json/accesorios.json');
  } else if (path.includes('ofertas.html')) {
    await loadComponent('main-content', '/nutraadvance-frontend/pages/ofertas.html');
    const { loadProducts } = await import('/nutraadvance-frontend/src/js/catalogo.js');
    loadProducts('/nutraadvance-frontend/src/public/json/ofertas.json');
  } else {
    // Vista por defecto (Inicio / Hero)
    await loadComponent('main-content', '/nutraadvance-frontend/src/public/partials/main-hero.html');
  }

  initSPAInteractions();
});

// INTERESANTE: Enrutador SPA ligero para evitar recargas de página
// INTERESANTE: Enrutador SPA ligero para evitar recargas de página
function initSPAInteractions() {
  document.body.addEventListener('click', async (e) => {
    const link = e.target.closest('a');
    
    if (link && link.getAttribute('href')) {
      const href = link.getAttribute('href');

      // Si es un enlace interno hacia otra sección
      if (href.includes('salud.html') || href.includes('accesorios.html') || href.includes('ofertas.html') || href.includes('index.html')) {
        e.preventDefault(); // Evita que el navegador recargue la página
        
        // 1. Definimos la vista por defecto
        let targetView = '/nutraadvance-frontend/src/public/partials/main-hero.html';
        let currentType = 'home';
        
        if (href.includes('salud.html')) {
          targetView = '/nutraadvance-frontend/pages/salud.html'; 
          currentType = 'salud';
        } else if (href.includes('accesorios.html')) {
          targetView = '/nutraadvance-frontend/pages/accesorios.html';
          currentType = 'accesorios';
        } else if (href.includes('ofertas.html')) {
          targetView = '/nutraadvance-frontend/pages/ofertas.html';
          currentType = 'ofertas';
        } else if (href.includes('index.html') || href === '') {
          targetView = '/nutraadvance-frontend/src/public/partials/main-hero.html';
          currentType = 'home';
        }

        // 2. Cargamos el HTML en el contenedor principal
        await loadComponent('main-content', targetView);

        // 3. Si es una página de catálogo, cargamos su JSON y pintamos los productos al instante
        if (currentType === 'salud') {
          const { loadProducts } = await import('/nutraadvance-frontend/src/js/catalogo.js');
          loadProducts('/nutraadvance-frontend/src/public/json/salud.json');
        } else if (currentType === 'accesorios') {
          const { loadProducts } = await import('/nutraadvance-frontend/src/js/catalogo.js');
          loadProducts('/nutraadvance-frontend/src/public/json/accesorios.json');
        } else if (currentType === 'ofertas') {
          const { loadProducts } = await import('/nutraadvance-frontend/src/js/catalogo.js');
          loadProducts('/nutraadvance-frontend/src/public/json/ofertas.json');
        }

        // 4. Actualizamos la URL del navegador sin recargar (Y eliminamos las líneas duplicadas de abajo)
        window.history.pushState({}, '', href);
      }
    }
  });

  // Manejar el botón de "atrás" o "adelante" del navegador
  window.addEventListener('popstate', () => {
    console.log('Navegando con historial del navegador');
  });
}