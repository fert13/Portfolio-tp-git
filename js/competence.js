


const competenceForm = document.getElementById('competenceForm');
const competenceList = document.getElementById('competenceList');
const modal = document.getElementById('competenceModal');

const openModal = () => {
    modal.style.display = 'flex';
};

const closeModal = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
};


const loadCompetences = () => {
    const competences = JSON.parse(localStorage.getItem('competences')) || [];
    competenceList.innerHTML = '';
    
    if(competences.length > 0){
       h2= competenceList.appendChild(document.createElement('h2'));
       h2.className='bienvenu';
       h2.appendChild(document.createElement('b')).innerHTML= "Autres competences"
    }
    competences.forEach((competence, index) => {
        const div = document.createElement('div');
        div.className = 'competence';
        div.innerHTML = `
            <strong>${competence.name}</strong> - ${competence.description || 'Aucune description'} - ${competence.level}
            <button onclick="editCompetence(${index})">Modifier</button>
            <button onclick="deleteCompetence(${index})">Supprimer</button>
        `;
        competenceList.appendChild(div);
    })
};

const saveCompetences = (competences) => {
    localStorage.setItem('competences', JSON.stringify(competences));
    loadCompetences();
};

competenceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('competenceName').value;
    const description = document.getElementById('competenceDescription').value;
    const level = document.getElementById('competenceLevel').value;
    const competences = JSON.parse(localStorage.getItem('competences')) || [];
    competences.push({ name, description, level });
    saveCompetences(competences);
    competenceForm.reset();
    closeModal();
});

const editCompetence = (index) => {
    const competences = JSON.parse(localStorage.getItem('competences')) || [];
    const competence = competences[index];
    const newName = prompt('Modifier le nom:', competence.name);
    const newDescription = prompt('Modifier la description:', competence.description);
    const newLevel = prompt('Modifier le niveau:', competence.level);
    if (newName) competence.name = newName;
    if (newDescription) competence.description = newDescription;
    if (newLevel) competence.level = newLevel;
    saveCompetences(competences);
};

const deleteCompetence = (index) => {
    const competences = JSON.parse(localStorage.getItem('competences')) || [];
    competences.splice(index, 1);
    saveCompetences(competences);
};

loadCompetences();
