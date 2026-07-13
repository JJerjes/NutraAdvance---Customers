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

loadComponent('main-header', 'public/partials/header.html');








































// async function loadComponent(elementId, filePath) {
//   try {
//     const response = await fetch(filePath);

//     if (!response.ok) throw new Error(`No se pudo cargar ${filePath}`);
    
//     const data = await response.text();
//     document.getElementById(elementId).innerHTML = data;
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// loadComponent('main-header', 'public/partials/header.html');
