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

document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.querySelector('.typing-text');
    const text = "Hello, bienvenue sur mon profil !";
    let index = 0;
    let isDeleting = false;

    function typeWriter() {
        if (!isDeleting && index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        } else if (isDeleting && index > 0) {
            typingText.textContent = text.substring(0, index - 1);
            index--;
            setTimeout(typeWriter, 50);
        } else {
            isDeleting = !isDeleting;
            setTimeout(typeWriter, 1000);
        }
    }

    typeWriter();
});

// Gestion des filtres et de la recherche des projets
document.addEventListener('DOMContentLoaded', function() {
    const filterItems = document.querySelectorAll('.filter-item');
    const searchInput = document.querySelector('.search-bar input');
    const projets = document.querySelectorAll('.projets');
    const projetsContainer = document.querySelector('.projets-container');

    // Créer le message "Aucun résultat"
    const noResultsMessage = document.createElement('div');
    noResultsMessage.className = 'no-results';
    noResultsMessage.style.display = 'none';
    noResultsMessage.style.textAlign = 'center';
    noResultsMessage.style.padding = '40px';
    noResultsMessage.style.color = '#780875';
    noResultsMessage.style.fontSize = '20px';
    noResultsMessage.style.background = 'rgba(255, 255, 255, 0.95)';
    noResultsMessage.style.borderRadius = '20px';
    noResultsMessage.style.boxShadow = '0 5px 20px rgba(120, 37, 117, 0.1)';
    noResultsMessage.innerHTML = `
        <i class="fa-solid fa-search" style="font-size: 40px; margin-bottom: 15px;"></i>
        <p>Aucun projet ne correspond à vos critères</p>
        <button class="reset-filters" style="
            margin-top: 15px;
            padding: 10px 20px;
            background: linear-gradient(135deg, #780875, #de0fd8);
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
        ">Réinitialiser les filtres</button>
    `;
    projetsContainer.appendChild(noResultsMessage);

    // Fonction pour réinitialiser les filtres
    function resetFilters() {
        // Réinitialiser la barre de recherche
        searchInput.value = '';
        
        // Réinitialiser les filtres actifs
        filterItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Réactiver le filtre "Tous les projets"
        const allProjectsFilter = document.querySelector('.filter-item[data-category="tout"]');
        if (allProjectsFilter) {
            allProjectsFilter.classList.add('active');
        }
        
        // Réafficher tous les projets
        projets.forEach(projet => {
            projet.style.display = 'flex';
        });
        
        // Cacher le message "Aucun résultat"
        noResultsMessage.style.display = 'none';
    }

    // Ajouter l'événement de clic sur le bouton de réinitialisation
    noResultsMessage.querySelector('.reset-filters').addEventListener('click', resetFilters);

    // Fonction pour filtrer les projets
    function filterProjects() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-item.active[data-category]')?.dataset.category;
        const activeTech = document.querySelector('.filter-item.active[data-tech]')?.dataset.tech;

        let visibleCount = 0;

        projets.forEach(projet => {
            const title = projet.querySelector('h2').textContent.toLowerCase();
            const description = projet.querySelector('p').textContent.toLowerCase();
            const technologies = Array.from(projet.querySelectorAll('.utils')).map(img => img.alt.toLowerCase());
            
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = !activeCategory || activeCategory === 'tout' || projet.classList.contains(activeCategory);
            const matchesTech = !activeTech || technologies.some(tech => tech.includes(activeTech));

            if (matchesSearch && matchesCategory && matchesTech) {
                projet.style.display = 'flex';
                visibleCount++;
            } else {
                projet.style.display = 'none';
            }
        });

        // Afficher ou cacher le message "Aucun résultat"
        if (visibleCount === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }

    // Gestion des clics sur les filtres
    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            // Retirer la classe active de tous les filtres du même groupe
            const filterGroup = this.closest('.filter-group');
            filterGroup.querySelectorAll('.filter-item').forEach(filter => {
                filter.classList.remove('active');
            });
            
            // Ajouter la classe active au filtre cliqué
            this.classList.add('active');
            
            // Appliquer les filtres
            filterProjects();
        });
    });

    // Gestion de la recherche
    searchInput.addEventListener('input', filterProjects);

    // Initialiser l'affichage
    filterProjects();

    // Créer le modal
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.zIndex = '1000';
    modal.style.overflow = 'auto';
    modal.style.padding = '20px';
    modal.style.boxSizing = 'border-box';
    document.body.appendChild(modal);

    // Fonction pour ouvrir le modal
    function openModal(projet) {
        const title = projet.querySelector('h2').textContent;
        const description = projet.querySelector('p').textContent;
        const tasks = Array.from(projet.querySelectorAll('ul li')).map(li => li.textContent);
        const image = projet.querySelector('.card-image img').src;
        const technologies = Array.from(projet.querySelectorAll('.utils')).map(img => ({
            src: img.src,
            alt: img.alt
        }));

        modal.innerHTML = `
            <div class="modal-content" style="
                background: white;
                max-width: 1000px;
                margin: 40px auto;
                padding: 30px;
                border-radius: 20px;
                position: relative;
                box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
            ">
                <button class="close-modal" style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    color: #780875;
                    cursor: pointer;
                    padding: 5px;
                    transition: all 0.3s ease;
                ">&times;</button>
                
                <div class="modal-header" style="
                    margin-bottom: 30px;
                    text-align: center;
                ">
                    <h2 style="
                        color: #780875;
                        font-size: 32px;
                        margin-bottom: 15px;
                    ">${title}</h2>
                </div>

                <div class="modal-body" style="
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                ">
                    <div class="modal-image" style="
                        border-radius: 15px;
                        overflow: hidden;
                        box-shadow: 0 5px 15px rgba(120, 37, 117, 0.1);
                    ">
                        <img src="${image}" alt="${title}" style="
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        ">
                    </div>

                    <div class="modal-info">
                        <div class="description" style="
                            margin-bottom: 30px;
                            line-height: 1.6;
                            color: #555;
                        ">
                            <h3 style="
                                color: #780875;
                                margin-bottom: 15px;
                                font-size: 24px;
                            ">Description</h3>
                            <p>${description}</p>
                        </div>

                        <div class="tasks" style="
                            margin-bottom: 30px;
                        ">
                            <h3 style="
                                color: #780875;
                                margin-bottom: 15px;
                                font-size: 24px;
                            ">Tâches réalisées</h3>
                            <ul style="
                                list-style: none;
                                padding: 0;
                            ">
                                ${tasks.map(task => `
                                    <li style="
                                        padding: 10px 15px;
                                        margin: 8px 0;
                                        background: rgba(120, 37, 117, 0.05);
                                        border-radius: 8px;
                                        color: #555;
                                        display: flex;
                                        align-items: center;
                                        gap: 10px;
                                    ">
                                        <i class="fa-solid fa-check" style="color: #780875;"></i>
                                        ${task}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>

                        <div class="technologies" style="
                            display: flex;
                            gap: 15px;
                            flex-wrap: wrap;
                        ">
                            <h3 style="
                                color: #780875;
                                margin-bottom: 15px;
                                font-size: 24px;
                                width: 100%;
                            ">Technologies utilisées</h3>
                            ${technologies.map(tech => `
                                <div style="
                                    padding: 10px;
                                    background: rgba(120, 37, 117, 0.05);
                                    border-radius: 8px;
                                    display: flex;
                                    align-items: center;
                                    gap: 8px;
                                ">
                                    <img src="${tech.src}" alt="${tech.alt}" style="
                                        width: 30px;
                                        height: 30px;
                                        object-fit: contain;
                                    ">
                                    <span style="color: #555;">${tech.alt}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Ajouter les événements
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Afficher le modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Fonction pour fermer le modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Ajouter les événements de clic sur les projets
    projets.forEach(projet => {
        projet.addEventListener('click', () => {
            openModal(projet);
        });
    });
});

