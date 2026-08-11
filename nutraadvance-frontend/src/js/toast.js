// Sistema de alertas flotantes (Toast) integradas con el HTML que ya tienes
export function mostrarToast(mensaje, tipo = "success") {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.textContent = mensaje;
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "6px";
  toast.style.color = "#fff";
  toast.style.fontWeight = "600";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  toast.style.transition = "opacity 0.3s ease";
  toast.style.backgroundColor = tipo === "success" ? "#2ecc71" : "#e74c3c";

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}