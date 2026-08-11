import { loadComponent } from './componentLoader.js';
import { renderCheckoutProducts } from './cartCheckout.js';
import './checkoutDynamics.js';
import { mostrarToast } from './toast.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cargar componentes visuales (Header y Footer)
  loadComponent('main-header', '../src/public/partials/header.html');
  loadComponent('main-footer', '../src/public/partials/footer.html');

  // 2. Renderizar los productos guardados en el localStorage
  renderCheckoutProducts();

});



