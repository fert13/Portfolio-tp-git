
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

// Créer une instance d'IntersectionObserver
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          // Ajouter la classe 'visible' pour activer l'animation de fade
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Arrêter l'observation une fois l'élément visible
      }
  });
}, {
  threshold: 0.5 // L'élément doit être à 50% visible pour que l'animation soit déclenchée
});

// Sélectionner toutes les timeline-entry et commencer l'observation
const timelineEntries = document.querySelectorAll('.timeline-entry');
timelineEntries.forEach(entry => {
  observer.observe(entry);
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

