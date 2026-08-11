function mostrarToast(mensaje, tipo = 'success', duracion = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.textContent = mensaje;

    toast.setAttribute('role', 'alert')

    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '5px';
    toast.style.color = '#fff';
    toast.style.minWidth = '200px';
    toast.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
    toast.style.opacity = '0.95';
    toast.style.transition = 'all 0.5s ease';

    if (tipo === 'success') {
        toast.style.backgroundColor = '#4CAF50'; // verde
    } else if (tipo === 'error') {
        toast.style.backgroundColor = '#f44336'; // rojo
    } else {
        toast.style.backgroundColor = '#2196F3'; // azul
    }

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        setTimeout(() => container.removeChild(toast), 500);
    }, duracion);
}




document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, select');

    const listaSeleccionados = document.getElementById('lista-seleccionados');
    const totalPrecioDiv = document.getElementById('total-precio');

    const branchSelect = document.getElementById('branch');
    const hourSelect = document.getElementById('hour');
    const sectionInput = document.getElementById('section');

    // Recuperar productos desde localStorage
    let productosSeleccionados = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrecio = 0;

    // Función para actualizar la lista y calcular total
    function actualizarListaProductos(productos) {
      productosSeleccionados = productos.map(item => ({
        ...item,
        cantidad: item.quantity || item.cantidad || 1
      }));

        if (listaSeleccionados) {
            listaSeleccionados.innerHTML = '';
            totalPrecio = 0;

            productosSeleccionados.forEach(producto => {
                const { nombre, precio, cantidad } = producto;
                const item = document.createElement('li');
                item.textContent = `${nombre}${producto.talla ? ` (talla: ${producto.talla})` : ''} - ${cantidad} unidad(es) - Precio: S/${(precio * cantidad).toFixed(2)}`;
                listaSeleccionados.appendChild(item);

                totalPrecio += precio * cantidad;
            });
        }

        if (totalPrecioDiv) {
            totalPrecioDiv.textContent = `Total: S/${totalPrecio.toFixed(2)}`;
        }
    }

    actualizarListaProductos(productosSeleccionados);

    function validarCampo(campo) {
        if (campo.checkValidity()) {
            campo.classList.add('completo');
            campo.classList.remove('incompleto');
            return true;
        } else {
            campo.classList.add('incompleto');
            campo.classList.remove('completo');
            return false;
        }
    }

    inputs.forEach(input => {
        input.addEventListener('input', () => validarCampo(input));
        input.addEventListener('change', () => validarCampo(input));
    });

    // ----------- NUEVO: Cargar horarios y representante según estación -----------
    let disponibilidad = [];

    const cargarDisponibilidad = async () => {
        try {
            const response = await fetch('../src/public/json/disponibilidad.json');
            const data = await response.json();
            disponibilidad = data.estaciones_del_tren || [];
        } catch (error) {
            console.error('Error al cargar disponibilidad:', error);
        }
    };

    await cargarDisponibilidad(); // Esperar que cargue antes de habilitar selección

    const actualizarHorarioYRepresentante = (index) => {
        hourSelect.innerHTML = '<option value="" disabled selected>Seleccione hora</option>';
        sectionInput.value = '';

        if (disponibilidad[index] && disponibilidad[index].length > 0) {
            const { inicio, fin, repre } = disponibilidad[index][0];
            sectionInput.value = repre;

            const [inicioHora, inicioMin] = inicio.split(':').map(Number);
            const [finHora, finMin] = fin.split(':').map(Number);

            let current = new Date();
            current.setHours(inicioHora, inicioMin, 0, 0);

            const end = new Date();
            end.setHours(finHora, finMin, 0, 0);

            while (current <= end) {
                const horaStr = current.toTimeString().slice(0, 5); // "HH:MM"
                const option = document.createElement('option');
                option.value = horaStr;
                option.textContent = horaStr;
                hourSelect.appendChild(option);

                current.setMinutes(current.getMinutes() + 30);
            }
        }
    };

    branchSelect.addEventListener('change', () => {
        const index = branchSelect.selectedIndex - 1; // Elimina "Seleccione una estación"
        actualizarHorarioYRepresentante(index);
    });

    // ----------- Envío del formulario -----------
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

      productosSeleccionados = (JSON.parse(localStorage.getItem('cart')) || []).map(item => ({
        ...item,
        cantidad: item.quantity || item.cantidad || 1
      }));

      console.log("Productos en memoria:", productosSeleccionados);
      console.log("Longitud del array:", productosSeleccionados.length);

        let formularioValido = true;

        inputs.forEach(input => {
            if (!input.disabled && input.offsetParent !== null) {
                const esValido = validarCampo(input);
                if (!esValido) formularioValido = false;
            }
        });

        if (!formularioValido) {
            mostrarToast('Por favor completa todos los campos en rojo.', 'error');
            return;
        }

        if (productosSeleccionados.length === 0) {
            mostrarToast('No hay productos seleccionados para el pedido.', 'error');
            return;
        }

        const nombre = form.querySelector('#name').value;
        const email = form.querySelector('#email').value;
        const telefono = form.querySelector('#phone').value;
        const fecha = form.querySelector('#date').value;
        const hora = form.querySelector('#hour').value;
        const branch = form.querySelector('#branch').value;
        const representante = form.querySelector('#section').value;

        const data = {
            nombre,
            email,
            telefono,
            fecha,
            hora,
            branch,
            representante,
            productos: productosSeleccionados,
            total: totalPrecio
        };

        try {
            // Simulación o Fetch real según prefieras
            console.log("📦 Datos del pedido:", data);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const simulatedOk = true; 

          if (simulatedOk) {
                mostrarToast("✅ Pedido confirmado con éxito.", "success");

                // --- MODAL CON DATOS DINÁMICOS DEL FORMULARIO ---
                const modalConfirmacion = document.getElementById('modal-confirmacion');
                const resumenModal = document.getElementById('resumen-pedido-modal');
                const btnCerrarModal = document.getElementById('btn-cerrar-modal');

                if (resumenModal) {
                      resumenModal.innerHTML = `
                          <p class="modal-title-greeting"><strong>¡Pedido confirmado, ${data.nombre}!</strong></p>
                          <div class="modal-details-group">
                              <p><strong>Estación:</strong> ${data.branch}</p>
                              <p><strong>Fecha:</strong> ${data.fecha}</p>
                              <p><strong>Hora:</strong> ${data.hora}</p>
                              <p><strong>Representante:</strong> ${data.representante}</p>
                              <p><strong>Total a pagar:</strong> S/${data.total.toFixed(2)}</p>
                          </div>
                          <hr class="modal-divider">
                          <p class="modal-email-notice">
                              Confirmación enviada a tu correo electrónico: <strong>${data.email}</strong>. 
                              <br><br>(Verifica que esté bien escrito o revisa tu bandeja de spam / no deseados).
                          </p>
                    `;    
                }

                if (modalConfirmacion) {
                    modalConfirmacion.style.display = 'flex';
                }

                if (btnCerrarModal) {
                    btnCerrarModal.onclick = () => {
                        modalConfirmacion.style.display = 'none';
                        form.reset();
                        localStorage.removeItem('cart');
                        actualizarListaProductos([]);
                        window.location.href = '/';
                    };
                }
            }

        } catch (error) {
            console.error('❌ Error al enviar:', error);
            mostrarToast(`Ocurrió un error: ${error.message}`, "error");
        }

        
        // try {
        //     const response = await fetch('https://www.lookandgo.pe/backend/confirmar-compra.php', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(data)
        //     });

        //     const result = await response.json();

        //     if (response.ok) {
        //         mostrarToast("✅ Pedido confirmado. Revisa tu correo.", "success");
        //         form.reset();
        //         localStorage.removeItem('cart');
        //         actualizarListaProductos([]);
        //         setTimeout(() => {
        //             window.location.href = '/';
        //         }, 2000); 
        //     } else {
        //         mostrarToast(`⚠️ Error: ${result.error || 'No se pudo confirmar el pedido.'}`, "error");
        //     }

        // } catch (error) {
        //     console.error('❌ Error al enviar:', error);
        //     mostrarToast(`Ocurrió un error al confirmar el pedido: ${error.message}`, "error");
        // }

    });
});

