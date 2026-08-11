// src/js/modal-confirmar.js
import { mostrarToast } from './toast.js'; // Asegúrate de que el nombre coincida (mostrarToast o mostratToast)

export function handleFormSubmit(e) {
  e.preventDefault();
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    mostrarToast("Tu carrito está vacío. Agrega productos antes de confirmar.");
    return;
  }

  // Validar campos obligatorios básicos
  const name = document.getElementById('name').value.trim();
  const dni = document.getElementById('dni').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const branchSelect = document.getElementById('branch');
  const branch = branchSelect.value.trim();
  const branchText = branchSelect.options[branchSelect.selectedIndex].text; // Agregado para que no falle branchText
  const date = document.getElementById('date').value.trim();
  const hour = document.getElementById('hour').value.trim();
  const representante = document.getElementById('section').value.trim();

  if (!name || !dni || !phone || !email || !branch || !date || !hour || !representante) {
    mostrarToast("Por favor completa todos los campos obligatorios.", "error");
    return;
  }

  // Calcular total y construir la lista de productos para el modal
  let total = 0;
  let productosHtml = '';

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    productosHtml += `
      <li style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 14px;">
        <span>${item.nombre} (x${item.quantity})</span>
        <strong>S/ ${subtotal.toFixed(2)}</strong>
      </li>
    `;
  }); // <-- Corrección: el bucle forEach cerraba antes de tiempo en tu código anterior

  // Datos estructurados del pedido para registro corporativo
  const pedidoData = {
    cliente: { name, dni, phone, email },
    entrega: {
      estacion: branchText,
      fecha: date,
      horario: hour,
      representante: representante
    },
    productos: cart,
    fechaRegistro: new Date().toISOString()
  };

  console.log("Pedido registrado formalmente:", pedidoData);

  // Mostrar el Modal con la información detallada del pedido
  const modalContainer = document.getElementById('modal-container'); // Nota: Corregido un error tipográfico en tu variable (modalConatiner -> modalContainer)
  if (modalContainer) {
    modalContainer.innerHTML = `
      <div class="modal-content" style="background: white; padding: 30px; border-radius: 12px; max-width: 500px; width: 90%; box-shadow: 0 10px 25px rgb(0,0,0,0.2); font-family: 'Montserrat', sans-serif;">
        <div style="text-align: center; margin-bottom: 20px">
          <i class="fa fa-check-circle" style="font-size: 22px; color: #2ecc71; margin-bottom: 10px;"></i>
          <h3 style="margin: 0; color: #2c3e50; font-size: 22px;">¡Pedido Confirmado!</h3>
          <p style="color: #7f8c8d; font-size: 14px; margin-top: 5px;">Gracias por tu compra, <strong>${name}</strong></p>
        </div>

        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px; font-size: 14px;">
          <p style="margin: 0 0 8px 0;"><strong>Estación de entrega:</strong> ${branchText}</p>
          <p style="margin: 0 0 8px 0;"><strong>Fecha y Hora:</strong> ${date} (${hour})</p>
          <p style="margin: 0;"><strong>Representante:</strong> ${representante}</p>
        </div>

        <div style="margin-bottom: 15px;">
          <p style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px; color: #2c3e50;">Productos seleccionados:</p>
          <ul style="list-style: none; padding: 0; margin: 0; max-height: 120px; overflow-y: auto; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 8px 0;">
            ${productosHtml}
          </ul>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: bold; margin-bottom: 20px; color: #2c3e50;">
          <span>Total a pagar:</span>
          <span style="color: #27ae60;">S/${total.toFixed(2)}</span>
        </div>

        <button id="cerrar-modal-exito" style="width: 100%; padding: 12px; background: #25d366; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 15px;">
          Entendido y Finalizar
        </button>
      </div>
    `;
    modalContainer.classList.add('active');
    
    // Acción al cerrar el modal (limpia carrito y redirige al inicio)
    document.getElementById('cerrar-modal-exito').addEventListener('click', () => {
      modalContainer.classList.remove('active');
      localStorage.removeItem('cart');
      window.location.href = '/index.html';
    });
  }
}