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
  await loadComponent('main-header', 'nutraadvance-frontend/src/public/partials/header.html');
  await loadComponent('main-content', 'nutraadvance-frontend/src/public/partials/main-hero.html'); 
  await loadComponent('main-footer', 'nutraadvance-frontend/src/public/partials/cart-modal.html');
  await loadComponent('main-footer', 'nutraadvance-frontend/src/public/partials/footer.html');

  const path = window.location.pathname;

  if (path.includes('salud.html')) {
    await loadComponent('main-content', 'nutraadvance-frontend/pages/salud.html');
    const { loadProducts } = await import('./catalogo.js');
    loadProducts('nutraadvance-frontend/src/public/json/salud.json');
  } else if (path.includes('accesorios.html')) {
    await loadComponent('main-content', 'nutraadvance-frontend/pages/accesorios.html');
    const { loadProducts } = await import('./catalogo.js');
    loadProducts('nutraadvance-frontend/src/public/json/accesorios.json');
  } else if (path.includes('ofertas.html')) {
    await loadComponent('main-content', 'nutraadvance-frontend/pages/ofertas.html');
    const { loadProducts } = await import('./catalogo.js');
    loadProducts('nutraadvance-frontend/src/public/json/ofertas.json');
  } else {
    await loadComponent('main-content', 'nutraadvance-frontend/src/public/partials/main-hero.html');
  }

  initSPAInteractions();
});

// ENRUTADOR SPA LIGERO (Solo para catálogos internos)
function initSPAInteractions() {
  document.body.addEventListener('click', async (e) => {
    const link = e.target.closest('a');
    
    if (link && link.getAttribute('href')) {
      const href = link.getAttribute('href');

      // Solo interceptamos los catálogos internos, dejamos que index.html funcione de forma nativa a un solo clic
      if (href.includes('salud.html') || href.includes('accesorios.html') || href.includes('ofertas.html')) {
        e.preventDefault(); 
        
        let targetView = '';
        let currentType = '';

        if (href.includes('salud.html')) {
          targetView = 'nutraadvance-frontend/pages/salud.html'; 
          currentType = 'salud';
        } else if (href.includes('accesorios.html')) {
          targetView = 'nutraadvance-frontend/pages/accesorios.html';
          currentType = 'accesorios';
        } else if (href.includes('ofertas.html')) {
          targetView = 'nutraadvance-frontend/pages/ofertas.html';
          currentType = 'ofertas';
        }

        await loadComponent('main-content', targetView);

        if (currentType === 'salud') {
          const { loadProducts } = await import('./catalogo.js');
          loadProducts('nutraadvance-frontend/src/public/json/salud.json');
        } else if (currentType === 'accesorios') {
          const { loadProducts } = await import('./catalogo.js');
          loadProducts('nutraadvance-frontend/src/public/json/accesorios.json');
        } else if (currentType === 'ofertas') {
          const { loadProducts } = await import('./catalogo.js');
          loadProducts('nutraadvance-frontend/src/public/json/ofertas.json');
        }

        window.history.pushState({}, '', href);
      }
    }
  });

  window.addEventListener('popstate', () => {
    console.log('Navegando con historial del navegador');
  });
}