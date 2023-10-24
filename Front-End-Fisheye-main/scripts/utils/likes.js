// Créez un objet pour stocker les likes
const likes = {};

// Fonction pour incrémenter le nombre de likes
function incrementLikes(index) {
  if (likes[index]) {
    likes[index]++;
  } else {
    likes[index] = 1;
  }
  updateLikesCount(index);
}

// Fonction pour décrémenter le nombre de likes
function decrementLikes(index) {
  if (likes[index] && likes[index] > 0) {
    likes[index]--;
  }
  updateLikesCount(index);
}

// Fonction pour mettre à jour l'affichage du nombre de likes
function updateLikesCount(index) {
  const likesCountElement = document.getElementById(`likescount-${index}`);
  if (likesCountElement) {
    likesCountElement.textContent = likes[index] || 0;
  }
}

// Écouteurs d'événements pour les clics sur les boutons "coeur"
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('heart-button')) {
    const index = event.target.dataset.index;
    if (event.target.classList.contains('liked')) {
      decrementLikes(index);
      event.target.classList.remove('liked');
    } else {
      incrementLikes(index);
      event.target.classList.add('liked');
    }
  }
});
