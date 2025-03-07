
const projets = Array.from(document.getElementsByClassName('projets'));
const categories = document.querySelectorAll('.projets-header li');

categories.forEach(category => {
  category.addEventListener('click', () => {
    const categoryId = category.id;


    projets.forEach(projet => {
      if (categoryId === 'tout') {

        projet.style.display = 'flex';
      } else {

        if (projet.classList.contains(categoryId)) {
          projet.style.display = 'flex';
        } else {
          projet.style.display = 'none';
        }
      }
    });
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('Service Worker enregistré avec succès:', registration);
    }).catch((error) => {
      console.log('Échec de l\'enregistrement du Service Worker:', error);
    });
  });
}

