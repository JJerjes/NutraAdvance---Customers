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
  await loadComponent('main-header', 'nutraadvance-frontend/src/public/partials/header.html');
  await loadComponent('main-content', 'nutraadvance-frontend/src/public/partials/main-hero.html'); 
  await loadComponent('main-footer', 'nutraadvance-frontend/src/public/partials/cart-modal.html');
  await loadComponent('main-footer', 'nutraadvance-frontend/src/public/partials/footer.html');

  const path = window.location.pathname;

  if (path.includes('salud.html')) {
    await loadComponent('main-content', '/NutraAdvance---Customers/nutraadvance-frontend/pages/salud.html');
    const { loadProducts } = await import('./catalogo.js');
    loadProducts('/NutraAdvance---Customers/nutraadvance-frontend/src/public/json/salud.json');
  } else if (path.includes('accesorios.html')) {
    await loadComponent('main-content', '/NutraAdvance---Customers/nutraadvance-frontend/pages/accesorios.html');
    const { loadProducts } = await import('./catalogo.js');
    loadProducts('/NutraAdvance---Customers/nutraadvance-frontend/src/public/json/accesorios.json');
  } else if (path.includes('ofertas.html')) {
    await loadComponent('main-content', '/NutraAdvance---Customers/nutraadvance-frontend/pages/ofertas.html');
    const { loadProducts } = await import('./catalogo.js');
    loadProducts('/NutraAdvance---Customers/nutraadvance-frontend/src/public/json/ofertas.json');
  } else {
    await loadComponent('main-content', '/NutraAdvance---Customers/nutraadvance-frontend/src/public/partials/main-hero.html');
  }

  initSPAInteractions();
});

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
        let targetView = 'nutraadvance-frontend/src/public/partials/main-hero.html';
        let currentType = 'home';

        if (href.includes('salud.html')) {
          targetView = '/NutraAdvance---Customers/nutraadvance-frontend/pages/salud.html'; 
          currentType = 'salud';
        } else if (href.includes('accesorios.html')) {
          targetView = '/NutraAdvance---Customers/nutraadvance-frontend/pages/accesorios.html';
          currentType = 'accesorios';
        } else if (href.includes('ofertas.html')) {
          targetView = '/NutraAdvance---Customers/nutraadvance-frontend/pages/ofertas.html';
          currentType = 'ofertas';
        } else if (href.includes('index.html') || href === '') {
          targetView = '/NutraAdvance---Customers/nutraadvance-frontend/src/public/partials/main-hero.html';
          currentType = 'home';
        }

        await loadComponent('main-content', targetView);

        if (currentType === 'salud') {
          const { loadProducts } = await import('./catalogo.js');
          loadProducts('/NutraAdvance---Customers/nutraadvance-frontend/src/public/json/salud.json');
        } else if (currentType === 'accesorios') {
          const { loadProducts } = await import('./catalogo.js');
          loadProducts('/NutraAdvance---Customers/nutraadvance-frontend/src/public/json/accesorios.json');
        } else if (currentType === 'ofertas') {
          const { loadProducts } = await import('./catalogo.js');
          loadProducts('/NutraAdvance---Customers/nutraadvance-frontend/src/public/json/ofertas.json');
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