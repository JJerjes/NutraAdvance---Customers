// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// export function saveCartStorage() {
//   localStorage.setItem('cart', JSON.stringify(cart));
// }

// // Función para minimizar el carrito y mostrar la pestaña flotante
// export function minimizeCartModal() {
//   const modal = document.getElementById('cart-modal');
//   const toggleBtn = document.getElementById('cart-toggle-btn');

//   if (modal) modal.style.display = 'none';
//   if (toggleBtn) toggleBtn.style.display = 'flex'; // Muestra la pestaña con el símbolo <
// }

// // Actualizamos openCartModal para que también oculte la pestaña flotante al abrirse
// export function openCartModal() {
//   const modal = document.getElementById('cart-modal');
//   const toggleBtn = document.getElementById('cart-toggle-btn');
  
//   if (modal) modal.style.display = 'flex';
//   if (toggleBtn) toggleBtn.style.display = 'none'; // Oculta la pestaña cuando el carrito está abierto
// }


// export function closeCartModal() {
//   const modal = document.getElementById('cart-modal');
//   if (modal) modal.style.display = 'none';
// }

// export function addToCart(product) {
//   const existingProduct = cart.find(item => item.id === product.id);

//   if (existingProduct) {
//     existingProduct.quantity += 1;
//   } else {
//     cart.push({
//       id: product.id,
//       nombre: product.nombre,
//       precio: product.precio.oferta,
//       quantity: 1
//     });
//   }

//   saveCartStorage();
//   updateCartModal();
//   openCartModal();
// }

// export function removeFromCart(productId) {
//   cart = cart.filter(item => item.id != productId);
//   saveCartStorage();
//   updateCartModal();
// }

// export function updateCartModal() {
//   const cartItemContainer = document.getElementById('cart-items-container');
//   const cartTotalElement = document.getElementById('cart-total');
//   const badgeElement = document.getElementById('cart-counter-badge');

//   // Actualiza el número en la pestaña minimizada
//   const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
//   if (badgeElement) badgeElement.textContent = totalItemsCount;

//   if (!cartItemContainer || !cartTotalElement) return;

//   if (cart.length === 0) {
//     cartItemContainer.innerHTML = `<p>Tu carrito está vacío.</p>`;
//     cartTotalElement.textContent = '0.00';
//     return;
//   }

//   cartItemContainer.innerHTML = '';
//   let total = 0;

//   cart.forEach(item => {
//     const subtotal = item.precio * item.quantity;
//     total += subtotal;

//     const itemElement = document.createElement('div');
//     itemElement.classList.add('cart-item-row');

//     itemElement.innerHTML = `
//       <span>${item.nombre} (x${item.quantity}) - S/${subtotal.toFixed(2)}</span>
//       <button class="remove-item-btn" data-id="${item.id}" style="background:none; border: none; cursor:pointer; font-weight:bold;">&times;</button>
//     `;
//     cartItemContainer.appendChild(itemElement);
//   });
//   cartTotalElement.textContent = total.toFixed(2);
// }

// document.addEventListener('click', (e) => {
//   if (e.target && e.target.id === 'checkout-btn') {
//     const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

//     if (currentCart.length === 0) {
//       alert('Tu carrito está vacio.');
//       return;
//     }

//     window.location.href = 'checkout.html';
//   }
// })








let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function saveCartStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para minimizar el carrito y mostrar la pestaña flotante
export function minimizeCartModal() {
  const modal = document.getElementById('cart-modal');
  const toggleBtn = document.getElementById('cart-toggle-btn');

  if (modal) modal.style.display = 'none';
  if (toggleBtn) toggleBtn.style.display = 'flex'; 
}

// Actualizamos openCartModal para que también oculte la pestaña flotante al abrirse
export function openCartModal() {
  const modal = document.getElementById('cart-modal');
  const toggleBtn = document.getElementById('cart-toggle-btn');
  
  if (modal) modal.style.display = 'flex';
  if (toggleBtn) toggleBtn.style.display = 'none'; 
}

export function closeCartModal() {
  const modal = document.getElementById('cart-modal');
  if (modal) modal.style.display = 'none';
}

export function addToCart(product) {
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio.oferta,
      quantity: 1
    });
  }

  saveCartStorage();
  updateCartModal();
  openCartModal();
}

export function removeFromCart(productId) {
  cart = cart.filter(item => item.id != productId);
  saveCartStorage();
  updateCartModal();
}

export function updateCartModal() {
  const cartItemContainer = document.getElementById('cart-items-container');
  const cartTotalElement = document.getElementById('cart-total');
  const badgeElement = document.getElementById('cart-counter-badge');

  // Actualiza el número en la pestaña minimizada
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (badgeElement) badgeElement.textContent = totalItemsCount;

  if (!cartItemContainer || !cartTotalElement) return;

  if (cart.length === 0) {
    cartItemContainer.innerHTML = `<p>Tu carrito está vacío.</p>`;
    cartTotalElement.textContent = '0.00';
    return;
  }

  cartItemContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.precio * item.quantity;
    total += subtotal;

    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item-row');

    itemElement.innerHTML = `
      <span style="line-height: 1.6;">
        <strong>Nombre:</strong> ${item.nombre}<br>
        <strong>Cantidad:</strong> ${item.quantity} unid.<br>
        <strong>Subtotal:</strong> S/ ${subtotal.toFixed(2)}
      </span>
      <button class="remove-item-btn" data-id="${item.id}" style="background:none; border: none; cursor:pointer; font-weight:bold;">&times;</button>  
    `;
    cartItemContainer.appendChild(itemElement);
  });
  cartTotalElement.textContent = total.toFixed(2);
}

// Manejo del botón de Checkout asegurando compatibilidad con la estructura de carpetas
document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'checkout-btn') {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

    if (currentCart.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    // Comprobamos la ruta actual para redirigir correctamente a checkout.html
    const path = window.location.pathname;
    if (path.includes('/pages/')) {
      window.location.href = 'checkout.html';
    } else {
      window.location.href = './pages/checkout.html';
    }
  }
});


// ==========================================
// CONEXIÓN DE EVENTOS DEL MODAL DEL CARRITO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Actualizar la vista del carrito con lo que haya guardado en localStorage al iniciar
  updateCartModal();

  // Si hay productos en el carrito al cargar, mostrar la pestaña flotante
  const toggleBtn = document.getElementById('cart-toggle-btn');
  if (cart.length > 0 && toggleBtn) {
    toggleBtn.style.display = 'flex';
  }
});

// Escuchar eventos de clics dentro del documento para el modal
document.addEventListener('click', (e) => {
  // 1. Abrir carrito desde la pestaña flotante lateral
  if (e.target.closest('#cart-toggle-btn')) {
    openCartModal();
  }

  // 2. Minimizar carrito (botón '>' del header del modal)
  if (e.target.closest('#minimize-modal')) {
    minimizeCartModal();
  }

  // 3. Eliminar un producto individual del carrito (botón '×')
  if (e.target.classList.contains('remove-item-btn')) {
    const productId = e.target.getAttribute('data-id');
    removeFromCart(productId);
    
    // Si el carrito se queda vacío al eliminar, ocultar la pestaña flotante
    if (cart.length === 0) {
      const toggleBtn = document.getElementById('cart-toggle-btn');
      if (toggleBtn) toggleBtn.style.display = 'none';
      minimizeCartModal();
    }
  }
});












