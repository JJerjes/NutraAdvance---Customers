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

loadComponent('main-header', 'nutraadvance-frontend/src/public/partials/header.html');
loadComponent('main-content', 'nutraadvance-frontend/src/public/partials/main-hero.html');
loadComponent('main-footer', 'nutraadvance-frontend/src/public/partials/footer.html');



