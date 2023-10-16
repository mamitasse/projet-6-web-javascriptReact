// Cette classe gère l'affichage des détails du photographe et la galerie de médias
class DetailPhotographerView {
  constructor() {
    // Initialisation des variables et éléments HTML
    this.totalMedia = [];
    this.currentMediaIndex = 0;
    this.lightbox = document.getElementById("lightbox");
    this.lightboxMedia = document.querySelector(".lightbox__media");
    this.lightboxTitle = document.querySelector(".lightbox__title");

    // Sélectionnez les boutons Next, Previous et Close pour ajouter des écouteurs d'événements
    this.nextButton = document.querySelector(".lightbox__next");
    this.previousButton = document.querySelector(".lightbox__previous");
    this.closeButton = document.querySelector(".close-btn");

    // Gestion de la touche "Escape" pour fermer la lightbox
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeLightbox();
    });

    // Écouteurs d'événements pour les boutons Next et Previous
    this.nextButton.addEventListener("click", () => {
      this.showNextMedia();
    });

    this.previousButton.addEventListener("click", () => {
      this.showPreviousMedia();
    });

    // Écouteurs d'événements pour la navigation à l'aide des touches de clavier (flèches gauche/droite)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.showPreviousMedia();
      if (e.key === 'ArrowRight') this.showNextMedia();
    });

    // Appel à la fonction pour configurer les gestionnaires d'événements des médias
    this.setupMediaEventHandlers();
  }

  // Cette méthode affiche les détails du photographe et sa galerie de médias
  displayPhotographerDetails(photographer, totalMedia) {
    this.totalMedia = totalMedia;
    this.photographer = photographer;

    // Affichage des informations du photographe
    const photographerHeader = document.querySelector(".photograph-header");
    photographerHeader.innerHTML = `
      <div class="photographer-info">
        <h1>${photographer.name}</h1>
        <p>${photographer.city}, ${photographer.country}</p>
        <p>${photographer.tagline}</p>
      </div>
      <button class="contact_button" onclick="displayModal()">Contactez-moi </button>
      <div class="photographer-photo">
        <img src="assets/photographers/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="${photographer.name}" />
      </div>
    `;

    // Mise à jour du titre du modal de contact
    const titreModal = document.querySelector(".titreModal");
    titreModal.innerHTML = `Contactez-moi <br>${photographer.name}`;

    // Affichage des médias dans la galerie
    const mediaContainer = document.getElementById("catalogue");
    mediaContainer.innerHTML = "";

    totalMedia.forEach((media, index) => {
      const mediaElement = document.createElement("div");
      mediaElement.classList.add("media");
      mediaElement.setAttribute("data-likes", media.likes);
      mediaElement.setAttribute("data-date", media.date);
      mediaElement.setAttribute("data-title", media.title);

      if (media.image) {
        mediaElement.innerHTML = `
          <img src="assets/photographers/Sample Photos/${photographer.name}-${photographer.id}/${media.image}" alt="${media.title}" />
          <div class="info">
            <p>${media.title}</p>
            <p class="likes" id="likes">${media.likes} <span><img src="assets/icons/coeur.svg" alt="coeur"></span></p>
          </div>
        `;

        // Ajout d'un gestionnaire d'événements pour ouvrir la lightbox lors du clic
        mediaElement.addEventListener("click", () => {
          this.openLightbox(index, photographer);
        });
      } else if (media.video) {
        mediaElement.innerHTML = `
          <video src="assets/photographers/Sample Photos/${photographer.name}-${photographer.id}/${media.video}" controls autoplay></video>
          <div class "info">
            <p>${media.title}</p>
            <p class="likes" id="likes">${media.likes} <span><img src="assets/icons/coeur.svg" alt="coeur"></span></p>
          </div>
        `;

        // Ajout d'un gestionnaire d'événements pour ouvrir la lightbox lors du clic
        mediaElement.addEventListener("click", () => {
          this.openLightbox(index, photographer);
        });
      }

      mediaContainer.appendChild(mediaElement);
    });
  }

  // Cette méthode trie les médias par popularité (likes)
  sortMediaByPopularity() {
    const mediaContainer = document.getElementById("catalogue");
    const mediaElements = Array.from(mediaContainer.querySelectorAll(".media"));

    mediaElements.sort((a, b) => {
      const likesA = parseInt(a.getAttribute("data-likes"));
      const likesB = parseInt(b.getAttribute("data-likes"));
      return likesB - likesA;
    });

    mediaElements.forEach((mediaElement) => {
      mediaContainer.appendChild(mediaElement);
    });
  }

  // Cette méthode trie les médias par date
  sortMediaByDate() {
    const mediaContainer = document.getElementById("catalogue");
    const mediaElements = Array.from(mediaContainer.querySelectorAll(".media"));

    mediaElements.sort((a, b) => {
      const dateA = new Date(a.getAttribute("data-date"));
      const dateB = new Date(b.getAttribute("data-date"));
      return dateB - dateA;
    });

    mediaElements.forEach((mediaElement) => {
      mediaContainer.appendChild(mediaElement);
    });
  }

  // Cette méthode trie les médias par titre
  sortMediaByTitle() {
    const mediaContainer = document.getElementById("catalogue");
    const mediaElements = Array.from(mediaContainer.querySelectorAll(".media"));

    mediaElements.sort((a, b) => {
      const titleA = a.getAttribute("data-title");
      const titleB = b.getAttribute("data-title");
      return titleA.localeCompare(titleB);
    });

    mediaElements.forEach((mediaElement) => {
      mediaContainer.appendChild(mediaElement);
    });
  }

  // Configuration des gestionnaires d'événements pour les médias
  setupMediaEventHandlers() {
    const mediaElements = document.querySelectorAll("#catalogue .media img, #catalogue .media video");

    mediaElements.forEach((media, index) => {
      media.addEventListener("click", (e) => {
        // Empêche l'ouverture de la lightbox au clic
        e.stopPropagation();
        e.preventDefault();
        
        // Affiche la lightbox uniquement si la touche "Entrée" est pressée
        media.addEventListener("keydown", (e) => {
          if (e.key === 'Enter') {
            this.openLightbox(index, this.photographer);
          }
        });
      });
    });
  }

  // Cette méthode ouvre la lightbox avec le média sélectionné
  openLightbox(index, photographer) {
    this.currentMediaIndex = index;
    const media = this.totalMedia[index];

    this.lightboxMedia.innerHTML = "";

    if (media.image) {
      const img = document.createElement("img");
      img.src = `assets/photographers/Sample Photos/${photographer.name}-${photographer.id}/${media.image}`;
      this.lightboxMedia.appendChild(img);
    } else if (media.video) {
      const video = document.createElement("video");
      video.src = `assets/photographers/Sample Photos/${photographer.name}-${photographer.id}/${media.video}`;
      video.controls = true;
      this.lightboxMedia.appendChild(video);
    }

    this.lightboxTitle.textContent = media.title;
    this.lightbox.style.display = "block";
  }

  // Cette méthode affiche le média suivant dans la lightbox
  showNextMedia() {
    if (this.currentMediaIndex < this.totalMedia.length - 1) {
      this.currentMediaIndex++;
      this.openLightbox(this.currentMediaIndex, this.photographer);
    }
  }

  // Cette méthode affiche le média précédent dans la lightbox
  showPreviousMedia() {
    if (this.currentMediaIndex > 0) {
      this.currentMediaIndex--;
      this.openLightbox(this.currentMediaIndex, this.photographer);
    }
  }

  // Cette méthode ferme la lightbox
  closeLightbox() {
    this.lightbox.style.display = "none";
  }
}

// Création d'une instance de DetailPhotographerView
const detailPhotographerView = new DetailPhotographerView();

// Gestion du bouton pour afficher/masquer la liste de tri
const toggleDropdownButton = document.getElementById("toggleDropdown");
const dropdownContent = document.getElementById("dropdownContent");
const chevron = document.querySelector(".chevron");

toggleDropdownButton.addEventListener("click", () => {
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
    chevron.classList.remove("rotate");
  } else {
    dropdownContent.style.display = "block";
    chevron.classList.add("rotate");
  }
});

// Gestion des boutons de tri
const sortByTitle = document.getElementById("sortByTitle");
sortByTitle.addEventListener("click", () => {
  detailPhotographerView.sortMediaByTitle();
});

const sortByDate = document.getElementById("sortByDate");
sortByDate.addEventListener("click", () => {
  detailPhotographerView.sortMediaByDate();
});

// Gestion du bouton de fermeture de la lightbox
const closeButton = document.querySelector(".close-btn");
closeButton.addEventListener("click", () => {
  detailPhotographerView.closeLightbox();
});

// Autres gestionnaires d'événements (par exemple, pour la navigation à l'aide des touches de clavier)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    detailPhotographerView.showPreviousMedia();

  } else if (e.key === 'ArrowRight') {
    detailPhotographerView.showNextMedia();
    
  }
});