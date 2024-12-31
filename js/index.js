
const projets = Array.from(document.getElementsByClassName('projets'));
console.log(projets)
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
