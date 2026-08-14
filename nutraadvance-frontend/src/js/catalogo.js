import { addToCart, updateCartModal, openCartModal, minimizeCartModal } from "./cart.js";

let allProductsLoaded = [];

// Función para cargar componentes parciales
async function loadComponent(targetContainer, filePath) {
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

// Carga inicial de elementos globales si no están en el index
loadComponent('main-header', 'nutraadvance-frontend/src/public/partials/header.html');
loadComponent('main-footer', 'nutraadvance-frontend/src/public/partials/footer.html');
loadComponent('modal-container', 'nutraadvance-frontend/src/public/partials/cart-modal.html');

export async function loadProducts(jsonPath) {
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error('No se pudo cargar el archivo de productos');
    
    const products = await response.json();
    allProductsLoaded = products;

    const container = document.getElementById('products-grid');
    if (!container) return;

    container.innerHTML = '';

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      productCard.innerHTML = `
        <img src="${product.imagen}" alt="${product.nombre}" class="product-thumb" loading="lazy">
        <div class="product-info">
          <h3>${product.nombre}</h3>
          <p>${product.descripcion}</p>
        
          <div class="price-container">
            <span class="original-price" style="text-decoration: line-through; font-size: 0.7rem; color: #888; margin-right: 8px;">Antes: S/${product.precio.original}</span>
            <span class="price">Ahora: S/${product.precio.oferta}</span>
          </div>
          <button class="btn-buy" data-id="${product.id}">Añadir al carrito</button>
        </div>      
      `;

      // --- ¡SOLUCIÓN DIRECTA AQUÍ! ---
      // Asignamos el evento de clic directamente al botón recién creado
      const buyBtn = productCard.querySelector('.btn-buy');
      buyBtn.addEventListener('click', () => {
        console.log("Botón presionado para el producto ID:", product.id);
        
        // // Estructura limpia para el carrito
        // const productForCart = {
        //   id: product.id,
        //   nombre: product.nombre,
        //   precio: product.precio.oferta,
        //   quantity: 1
        // };

        addToCart(product);
      });

      container.appendChild(productCard);
    });

    // --- LÓGICA DEL MODAL DE IMAGEN ---
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('img01');
    const closeBtn = document.querySelector('.close-modal');

    if (modal && modalImg && closeBtn) {
      const thumbnails = container.querySelectorAll('.product-thumb');

      thumbnails.forEach(img => {
        img.addEventListener('click', (e) => {
          modal.style.display = 'block';
          modalImg.src = e.target.src;
        });
      });

      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }

  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

// Configuración de eventos generales de la interfaz del carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const pathname = window.location.pathname;

  if (pathname.includes('salud.html')) {
    loadProducts('nutraadvance-frontend/src/public/json/salud.json');
  } else if (pathname.includes('accesorios.html')) {
    loadProducts('nutraadvance-frontend/src/public/json/accesorios.json');
  } else if (pathname.includes('ofertas.html')) {
    loadProducts('nutraadvance-frontend/src/public/json/ofertas.json');
  }

  updateCartModal();

  // Escuchador global exclusivo para los controles del modal (minimizar, abrir, etc.)
  document.addEventListener('click', (event) => {
    const minimizeBtn = event.target.closest('#minimize-modal');
    if (minimizeBtn) {
      minimizeCartModal();
      return;
    }

    const toggleTab = event.target.closest('#cart-toggle-btn');
    if (toggleTab) {
      openCartModal();
      return;
    }

    const modalContainer = document.getElementById('cart-modal');
    if (event.target === modalContainer) {
      minimizeCartModal();
    }
  });
});