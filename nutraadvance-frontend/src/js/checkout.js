import { loadComponent } from './componentLoader.js';
import { renderCheckoutProducts } from './cartCheckout.js';
// import { setupFormDynamics } from './checkoutDynamics.js'; 
// import { handleFormSubmit } from './modal-confirmar.js';
import './checkoutDynamics.js';
import { mostrarToast } from './toast.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cargar componentes visuales (Header y Footer)
  loadComponent('main-header', '../src/public/partials/header.html');
  loadComponent('main-footer', '../src/public/partials/footer.html');

  // 2. Renderizar los productos guardados en el localStorage
  renderCheckoutProducts();

  // 3. Configurar dinámicas del formulario (ej. horarios según estación, representante)
  // setupFormDynamics();

  // 4. Manejar el envío del formulario
  // const contactForm = document.getElementById('contact-form');
  // if (contactForm) {
  //   contactForm.addEventListener('submit', handleFormSubmit);
  // }
});



