// import { addToCart, removeFromCart, updateCartModal, openCartModal, closeCartModal, minimizeCartModal } from "./cart.js";

// let allProductsLoaded = [];

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

// loadComponent('main-header', '../src/public/partials/header.html');
// loadComponent('main-footer', '../src/public/partials/footer.html');
// loadComponent('modal-container', '../src/public/partials/cart-modal.html');

// async function loadProducts(jsonPath) {
//   try {
//     const response = await fetch(jsonPath);
//     if (!response.ok) throw new Error('No se pudo cargar el archivo de productos');
    
//     const products = await response.json();
//     allProductsLoaded = products;

//     const container = document.getElementById('products-grid');
//     if (!container) return;

//     container.innerHTML = '';

//     products.forEach(product => {
//       const productCard = document.createElement('div');
//       productCard.classList.add('product-card');

//       productCard.innerHTML = `
//         <img src="${product.imagen}" alt="${product.nombre}" class="product-thumb">
//         <div class="product-info">
//           <h3>${product.nombre}</h3>
//           <p>${product.descripcion}</p>
        
//           <div class="price-container">
//             <span class="original-price" style="text-decoration: line-through; font-size: 0.7rem; color: #888; margin-right: 8px;">Antes: S/${product.precio.original}</span>
//             <span class="price">Ahora: S/${product.precio.oferta}</span>
//           </div>
//           <button class="btn-buy" data-id="${product.id}">Añadir al carrito</button>
//         </div>
//       `;

//       container.appendChild(productCard);
//     });

//     // --- LÓGICA DEL MODAL DE IMAGEN ---
//     const modal = document.getElementById('imageModal');
//     const modalImg = document.getElementById('img01');
//     const closeBtn = document.querySelector('.close-modal');

//     // Si el modal existe en la página actual, activamos los eventos
//     if (modal && modalImg && closeBtn) {
//       const thumbnails = container.querySelectorAll('.product-thumb');

//       thumbnails.forEach(img => {
//         img.addEventListener('click', (e) => {
//           modal.style.display = 'block';
//           modalImg.src = e.target.src;
//         });
//       });

//       closeBtn.addEventListener('click', () => {
//         modal.style.display = 'none';
//       });

//       modal.addEventListener('click', (e) => {
//         if (e.target === modal) {
//           modal.style.display = 'none';
//         }
//       });
//     }

//   } catch (error) {
//     console.error('Error al cargar los productos:', error);
//   }
// }

// // Detectamos en qué página estamos según la URL
// document.addEventListener('DOMContentLoaded', () => {
//   if (window.location.pathname.includes('salud.html')) {
//     loadProducts('../src/public/json/salud.json');
//   }
  
//   if (window.location.pathname.includes('accesorios.html')) {
//     loadProducts('../src/public/json/accesorios.json');
//   }
  
//   if (window.location.pathname.includes('ofertas.html')) {
//     loadProducts('../src/public/json/ofertas.json');
//   }

//   updateCartModal();

//   // Escuchador global de clics corregido
//   document.addEventListener('click', (event) => {
//     // 1. Añadir al carrito
//     if (event.target.classList.contains('btn-buy')) {
//       const productId = event.target.getAttribute('data-id');
//       const selectedProduct = allProductsLoaded.find(p => p.id == productId);

//       if (selectedProduct) {
//         addToCart(selectedProduct);
//       }
//     }

//     // 2. Eliminar producto individual
//     if (event.target.classList.contains('remove-item-btn')) {
//       const productId = event.target.getAttribute('data-id');
//       if (productId) removeFromCart(productId);
//     }

//     // 3. Minimizar el carrito (detecta el botón o cualquier elemento dentro de él)
//     const minimizeBtn = event.target.closest('#minimize-modal');
//     if (minimizeBtn) {
//       minimizeCartModal();
//       return;
//     }

//     // 4. Abrir el carrito desde la pestaña flotante minimizada
//     const toggleTab = event.target.closest('#cart-toggle-btn');
//     if (toggleTab) {
//       openCartModal();
//       return;
//     }

//     // 5. Cerrar o minimizar si hacen clic fuera del contenido deslizante (en el fondo oscuro)
//     const modalContainer = document.getElementById('cart-modal');
//     if (event.target === modalContainer) {
//       minimizeCartModal(); // Es mejor minimizar en lugar de cerrar por completo para no perder la pestaña
//     }
//   });

  
// });




// import { addToCart, removeFromCart, updateCartModal, openCartModal, closeCartModal, minimizeCartModal } from "./cart.js";

// let allProductsLoaded = [];

// async function loadComponent(targetContainer, filePath) {
//   try {
//     const response = await fetch(filePath);
//     if (!response.ok) throw new Error(`No se pudo cargar ${filePath}`);
//     const data = await response.text();
//     const container = document.getElementById(targetContainer);
//     if (container) {
//       container.innerHTML = data;
//     }
//   } catch (error) {
//     console.error('Error: ', error);
//   }
// }

// // Carga de componentes estáticos (asegúrate de incluir el prefijo de tu carpeta si es necesario)
// loadComponent('main-header', '/nutraadvance-frontend/src/public/partials/header.html');
// loadComponent('main-footer', '/nutraadvance-frontend/src/public/partials/footer.html');
// loadComponent('modal-container', '/nutraadvance-frontend/src/public/partials/cart-modal.html');

// export async function loadProducts(jsonPath) {
//   try {
//     const response = await fetch(jsonPath);
//     if (!response.ok) throw new Error('No se pudo cargar el archivo de productos');
    
//     const products = await response.json();
//     allProductsLoaded = products;

//     const container = document.getElementById('products-grid');
//     if (!container) return;

//     container.innerHTML = '';

//     products.forEach(product => {
//       const productCard = document.createElement('div');
//       productCard.classList.add('product-card');

//       productCard.innerHTML = `
//         <img src="${product.imagen}" alt="${product.nombre}" class="product-thumb">
//         <div class="product-info">
//           <h3>${product.nombre}</h3>
//           <p>${product.descripcion}</p>
        
//           <div class="price-container">
//             <span class="original-price" style="text-decoration: line-through; font-size: 0.7rem; color: #888; margin-right: 8px;">Antes: S/${product.precio.original}</span>
//             <span class="price">Ahora: S/${product.precio.oferta}</span>
//           </div>
//           <button class="btn-buy" data-id="${product.id}">Añadir al carrito</button>
//         </div>
//       `;

//       container.appendChild(productCard);
//     });

//     // --- LÓGICA DEL MODAL DE IMAGEN ---
//     const modal = document.getElementById('imageModal');
//     const modalImg = document.getElementById('img01');
//     const closeBtn = document.querySelector('.close-modal');

//     if (modal && modalImg && closeBtn) {
//       const thumbnails = container.querySelectorAll('.product-thumb');

//       thumbnails.forEach(img => {
//         img.addEventListener('click', (e) => {
//           modal.style.display = 'block';
//           modalImg.src = e.target.src;
//         });
//       });

//       closeBtn.addEventListener('click', () => {
//         modal.style.display = 'none';
//       });

//       modal.addEventListener('click', (e) => {
//         if (e.target === modal) {
//           modal.style.display = 'none';
//         }
//       });
//     }

//   } catch (error) {
//     console.error('Error al cargar los productos:', error);
//   }
// }

// // Detectamos en qué página estamos según la URL y gestionamos los eventos globales una sola vez
// document.addEventListener('DOMContentLoaded', () => {
//   const pathname = window.location.pathname;

//   if (pathname.includes('salud.html')) {
//     loadProducts('/nutraadvance-frontend/src/public/json/salud.json');
//   } else if (pathname.includes('accesorios.html')) {
//     loadProducts('/nutraadvance-frontend/src/public/json/accesorios.json');
//   } else if (pathname.includes('ofertas.html')) {
//     loadProducts('/nutraadvance-frontend/src/public/json/ofertas.json');
//   }

//   updateCartModal();

//   // Escuchador global de clics unificado para los botones del catálogo y del carrito
//   document.addEventListener('click', (event) => {
//     // 1. Cuando hacen clic en "Añadir al carrito" en cualquier tarjeta de producto
//     if (event.target.classList.contains('btn-buy')) {
//       const productId = event.target.getAttribute('data-id');
//       const selectedProduct = allProductsLoaded.find(p => p.id == productId);

//       if (selectedProduct) {
//         // Llamamos a la función importada de cart.js pasándole el objeto completo
//         addToCart(selectedProduct);
//       }
//     }

//     // 2. Cuando hacen clic para eliminar un producto del carrito
//     if (event.target.classList.contains('remove-item-btn')) {
//       const productId = event.target.getAttribute('data-id');
//       if (productId) removeFromCart(productId);
//     }

//     // 3. Minimizar carrito (botón '>' del header del modal)
//     const minimizeBtn = event.target.closest('#minimize-modal');
//     if (minimizeBtn) {
//       minimizeCartModal();
//       return;
//     }

//     // 4. Abrir carrito desde la pestaña flotante lateral
//     const toggleTab = event.target.closest('#cart-toggle-btn');
//     if (toggleTab) {
//       openCartModal();
//       return;
//     }

//     // 5. Cerrar si hacen clic fuera del contenido del modal
//     const modalContainer = document.getElementById('cart-modal');
//     if (event.target === modalContainer) {
//       minimizeCartModal();
//     }
//   });
// });

// // // Detectamos en qué página estamos según la URL y gestionamos los eventos globales una sola vez
// // document.addEventListener('DOMContentLoaded', () => {
// //   const pathname = window.location.pathname;

// //   if (pathname.includes('salud.html')) {
// //     loadProducts('/src/public/json/salud.json');
// //   } else if (pathname.includes('accesorios.html')) {
// //     loadProducts('/src/public/json/accesorios.json');
// //   } else if (pathname.includes('ofertas.html')) {
// //     loadProducts('/src/public/json/ofertas.json');
// //   }

// //   updateCartModal();

// //   // Escuchador global de clics unificado
// //   document.addEventListener('click', (event) => {
// //     if (event.target.classList.contains('btn-buy')) {
// //       const productId = event.target.getAttribute('data-id');
// //       const selectedProduct = allProductsLoaded.find(p => p.id == productId);

// //       if (selectedProduct) {
// //         addToCart(selectedProduct);
// //       }
// //     }

// //     if (event.target.classList.contains('remove-item-btn')) {
// //       const productId = event.target.getAttribute('data-id');
// //       if (productId) removeFromCart(productId);
// //     }

// //     const minimizeBtn = event.target.closest('#minimize-modal');
// //     if (minimizeBtn) {
// //       minimizeCartModal();
// //       return;
// //     }

// //     const toggleTab = event.target.closest('#cart-toggle-btn');
// //     if (toggleTab) {
// //       openCartModal();
// //       return;
// //     }

// //     const modalContainer = document.getElementById('cart-modal');
// //     if (event.target === modalContainer) {
// //       minimizeCartModal();
// //     }
// //   });
// // });


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
loadComponent('main-header', '/nutraadvance-frontend/src/public/partials/header.html');
loadComponent('main-footer', '/nutraadvance-frontend/src/public/partials/footer.html');
loadComponent('modal-container', '/nutraadvance-frontend/src/public/partials/cart-modal.html');

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
        
        // Estructura limpia para el carrito
        const productForCart = {
          id: product.id,
          nombre: product.nombre,
          precio: product.precio.oferta,
          quantity: 1
        };

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
    loadProducts('/nutraadvance-frontend/src/public/json/salud.json');
  } else if (pathname.includes('accesorios.html')) {
    loadProducts('/nutraadvance-frontend/src/public/json/accesorios.json');
  } else if (pathname.includes('ofertas.html')) {
    loadProducts('/nutraadvance-frontend/src/public/json/ofertas.json');
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