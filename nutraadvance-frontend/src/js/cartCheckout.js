export function renderCheckoutProducts() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const listaContainer = document.getElementById('lista-seleccionados');
  const totalContainer = document.getElementById('total-precio');

  if (!listaContainer || !totalContainer) return;

  if (cart.length === 0) {
    listaContainer.innerHTML = `<li>Tu carrito está vacío. <a href="salud.html" style="color: #3949ab; font-weight: bold;">Volver al catálogo</a></li>`;
    totalContainer.textContent = 'Total: S/0.00';
    return;
  }

  listaContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.precio * item.quantity;
    total += subtotal;

    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.innerHTML = `
      <span>${item.nombre} (x${item.quantity})</span>
      <strong>S/${subtotal.toFixed(2)}</strong>
    `;
    listaContainer.appendChild(li);
  });

  totalContainer.textContent = `Total: S/${total.toFixed(2)}`;
}

