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

loadComponent('main-header', 'src/public/partials/header.html');
loadComponent('main-content', 'src/public/partials/main-hero.html');
loadComponent('main-footer', 'src/public/partials/footer.html');


//TOQUE INTERACTIVO
function initCardInteractions() {
  const cards = document.querySelectorAll('#card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.querySelector('h3').innerText;
      console.log(`Navegando a: ${category}`);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCardInteractions();
})