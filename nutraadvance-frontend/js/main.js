async function loadComponent(targetContainer, filePath) {
  try {
    const response = await fetch(filePath);

    if (!response.ok) throw new Error(`No se pudo cargar ${filePath}`);
    const data = await response.text();

    document.getElementById(targetContainer).innerHTML = data;

  } catch (error) {
    console.error('Error: ', error);
  } 
}

loadComponent('main-header', '../src/public/partials/header.html');
loadComponent('main-footer', '../src/public/partials/footer.html');

async function loadProducts(jsonPath) {
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error('No se pudo cargar el archivo de productos');
    const products = await response.json();
    const container = document.getElementById('products-grid');

    if (!container) return;

    container.innerHTML = '';

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      productCard.innerHTML = `
        <img src="${product.imagen}" alt="${product.nombre}" class="product-thumb">
        <div class="product-info">
          <h3>${product.nombre}</h3>
          <p>${product.descripcion}</p>
        
          <div class="price-container">
            <span class="original-price" style="text-decoration: line-through; font-size: 0.85rem; color: #888; margin-right: 8px;">S/${product.precio.original}</span>
            <span class="price">S/${product.precio.oferta}</span>
          </div>
          <button class="btn-buy" data-id="${product.id}">Añadir al carrito</button>
        </div>      
      `;

      container.appendChild(productCard);
    });

    // --- LÓGICA DEL MODAL DE IMAGEN ---
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('img01');
    const closeBtn = document.querySelector('.close-modal');

    // Si el modal existe en la página actual, activamos los eventos
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

// Detectamos en qué página estamos según la URL
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('salud.html')) {
    loadProducts('../src/public/json/salud.json');
  }
  
  if (window.location.pathname.includes('accesorios.html')) {
    loadProducts('../src/public/json/accesorios.json');
  }
  
  if (window.location.pathname.includes('ofertas.html')) {
    loadProducts('../src/public/json/ofertas.json');
  }
});