// Variable global para la ruta base de GitHub Pages (Nombre de tu repositorio)
const BASE_PATH = '/NutraAdvance---Customers/nutraadvance-frontend/';

// FUNCIÓN loadComponent
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
  await loadComponent('main-header', BASE_PATH + 'src/public/partials/header.html');
  await loadComponent('main-content', BASE_PATH + 'src/public/partials/main-hero.html'); 
  
  // NOTA: Tienes ambos cargando en 'main-footer'. El footer reemplazará al cart-modal. 
  // Te sugiero cambiar uno de los dos a otro contenedor en tu index.html (ej. 'modal-container')
  await loadComponent('main-footer', BASE_PATH + 'src/public/partials/cart-modal.html');
  await loadComponent('main-footer', BASE_PATH + 'src/public/partials/footer.html');

  const path = window.location.pathname;

  if (path.includes('salud.html')) {
    await loadComponent('main-content', BASE_PATH + 'pages/salud.html');
    // CORRECCIÓN: Ruta absoluta para el import de JS
    const { loadProducts } = await import(BASE_PATH + 'src/js/catalogo.js');
    loadProducts(BASE_PATH + 'src/public/json/salud.json');
  } else if (path.includes('accesorios.html')) {
    await loadComponent('main-content', BASE_PATH + 'pages/accesorios.html');
    const { loadProducts } = await import(BASE_PATH + 'src/js/catalogo.js');
    loadProducts(BASE_PATH + 'src/public/json/accesorios.json');
  } else if (path.includes('ofertas.html')) {
    await loadComponent('main-content', BASE_PATH + 'pages/ofertas.html');
    const { loadProducts } = await import(BASE_PATH + 'src/js/catalogo.js');
    loadProducts(BASE_PATH + 'src/public/json/ofertas.json');
  } else {
    await loadComponent('main-content', BASE_PATH + 'src/public/partials/main-hero.html');
  }

  initSPAInteractions();
});

// ENRUTADOR SPA LIGERO
function initSPAInteractions() {
  document.body.addEventListener('click', async (e) => {
    const link = e.target.closest('a');
    
    if (link && link.getAttribute('href')) {
      const href = link.getAttribute('href');

      if (href.includes('salud.html') || href.includes('accesorios.html') || href.includes('ofertas.html')) {
        e.preventDefault(); 
        
        let targetView = '';
        let currentType = '';

        if (href.includes('salud.html')) {
          targetView = BASE_PATH + 'pages/salud.html'; 
          currentType = 'salud';
        } else if (href.includes('accesorios.html')) {
          targetView = BASE_PATH + 'pages/accesorios.html';
          currentType = 'accesorios';
        } else if (href.includes('ofertas.html')) {
          targetView = BASE_PATH + 'pages/ofertas.html';
          currentType = 'ofertas';
        }

        await loadComponent('main-content', targetView);

        if (currentType === 'salud') {
          const { loadProducts } = await import(BASE_PATH + 'src/js/catalogo.js');
          loadProducts(BASE_PATH + 'src/public/json/salud.json');
        } else if (currentType === 'accesorios') {
          const { loadProducts } = await import(BASE_PATH + 'src/js/catalogo.js');
          loadProducts(BASE_PATH + 'src/public/json/accesorios.json');
        } else if (currentType === 'ofertas') {
          const { loadProducts } = await import(BASE_PATH + 'src/js/catalogo.js');
          loadProducts(BASE_PATH + 'src/public/json/ofertas.json');
        }

        window.history.pushState({}, '', href);
      }
    }
  });

  window.addEventListener('popstate', () => {
    console.log('Navegando con historial del navegador');
  });
}