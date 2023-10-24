// Cette classe gère l'affichage des détails du photographe et la galerie de médias
class DetailPhotographerView {
  constructor() {
    // Initialisation des variables et éléments HTML
    this.totalMedia = [];
    this.currentMediaIndex = 0;
    this.lightbox = document.getElementById("lightbox");
    this.lightboxMedia = document.querySelector(".lightbox__media");
    this.lightboxTitle = document.querySelector(".lightbox__title");
    this.likes = [];
    // Sélectionnez les boutons Next, Previous et Close pour ajouter des écouteurs d'événements
    this.nextButton = document.querySelector(".lightbox__next");
    this.previousButton = document.querySelector(".lightbox__previous");
    this.closeButton = document.querySelector(".close-btn");
    this.likeButtons = document.querySelectorAll(".heart-button");



    this.manageDropdown();

    // Gestion de la touche "Escape" pour fermer la lightbox
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeLightbox();
    });

    // Écouteurs d'événements pour les boutons Next et Previous
    this.nextButton.addEventListener("click", () => {
      this.showNextMedia();
    });

    this.previousButton.addEventListener("click", () => {
      this.showPreviousMedia();
    });

    // Écouteurs d'événements pour la navigation à l'aide des touches de clavier (flèches gauche/droite)
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.showPreviousMedia();
      if (e.key === "ArrowRight") this.showNextMedia();
    });

    

    // Gestion du bouton de fermeture de la lightbox
    this.closeButton.addEventListener("click", () => {
      this.closeLightbox();
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
        <h1 tabindex="2">${photographer.name}</h1>
        <p tabindex="3">${photographer.city}, ${photographer.country}</p>
        <p tabindex="4">${photographer.tagline}</p>
      </div>
      <button tabindex="5" class="contact_button" onclick="displayModal()">Contactez-moi </button>
      <div class="photographer-photo" tabindex="6">
        <img src="assets/photographers/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="${photographer.name}" />
      </div>
    `;

    // Mise à jour du titre du modal de contact
    const titreModal = document.querySelector(".titreModal");
    titreModal.innerHTML = `Contactez-moi <br>${photographer.name}`;

    // Calcul du total des likes du photographe
    const totalLikes = totalMedia.reduce(
      (total, media) => total + media.likes,
      0
    );

    // Affichage du total des likes du photographe
    const totalLikesElement = document.getElementById("totalLikes");
    totalLikesElement.innerHTML = `<div> ${totalLikes} <span class="heart">&#x1F5A4;</span></div><div> ${photographer.price}€/jour</div>`;

    // Affichage des médias dans la galerie
    const mediaContainer = document.getElementById("catalogue");
    mediaContainer.innerHTML = "";

    totalMedia.forEach((media, index) => {
      const mediaElement = document.createElement("div");
      mediaElement.classList.add("media");
      mediaElement.setAttribute("data-likes", media.likes);
      mediaElement.setAttribute("data-date", media.date);
      mediaElement.setAttribute("data-title", media.title);

      mediaElement.innerHTML = this.htmlMediaFactory(photographer, media, index);

      // Ajout d'un gestionnaire d'événements pour ouvrir la lightbox lors du clic sur le média
      mediaElement.addEventListener("click", () => {
        this.openLightboxForMedia(index, photographer);
      });
    
      mediaContainer.appendChild(mediaElement);
    
      // Récupérez le bouton "J'aime" de ce média
      const likeButton = mediaElement.querySelector(".heart-button");
      
      // Ajoutez un gestionnaire d'événements pour le bouton "J'aime" pour empêcher la propagation
      likeButton.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    });
  }

// Ajoutez cette méthode dans votre classe DetailPhotographerView
openLightboxForMedia(index, photographer) {
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

  // Méthode pour générer le code HTML de chaque média en fonction du type (image ou vidéo)
  htmlMediaFactory(photographer, media, index) {
    if (media.image) {
      return `
        <div class="photo-media" tabindex="8">
          <img src="assets/photographers/Sample Photos/${photographer.name}-${photographer.id}/${media.image}" alt="${media.title}" />
        </div>
        <div class="info">
          <p>${media.title}</p>
          <p class="likes" id="likes-${index}">${media.likes} <button class="heart-button liked" data-index><span><img src="assets/icons/coeur.svg" alt="coeur"></span></button></p>
        `;
    } else if (media.video) {
      return `
        <div class="video-media" tabindex="8">
          <video src="assets/photographers/Sample Photos/${photographer.name}-${photographer.id}/${media.video}" class="video" controls autoplay></video>
        </div>
        <div class="info">
          <p>${media.title}</p>
          <p class="likes" id="likes-${index}">${media.likes} <button class="heart-button liked" data-index><span><img src="assets/icons/coeur.svg" alt="coeur"></span></button></p>
        `;
    }
  }


  setupMediaEventHandlers() {
    const photoMediaElements = document.querySelectorAll(".photo-media img");
    const videoMediaElements = document.querySelectorAll(".video-media video");
  
    photoMediaElements.forEach((photoMedia, index) => {

      
       // Récupérez le bouton "J'aime" du média
    const likeButton = mediaElement.querySelector(".like-button");

    likeButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Empêche la propagation de l'événement
      this. handleLikeButtonClick(index, likeButton);
      console.log("le bouton like est clique")
    });
      photoMedia.addEventListener("click", () => {
        this.openLightboxForMedia(index, this.photographer); // Utilisez openLightboxForMedia
      });
  
      // Affiche la lightbox uniquement si la touche "Entrée" est pressée
      photoMedia.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.openLightboxForMedia(index, this.photographer); // Utilisez openLightboxForMedia
        }
      });
      
    });
  
    videoMediaElements.forEach((videoMedia, index) => {
      videoMedia.addEventListener("click", () => {
        this.openLightboxForMedia(index, this.photographer); // Utilisez openLightboxForMedia
      });
  
      // Affiche la lightbox uniquement si la touche "Entrée" est pressée
      videoMedia.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.openLightboxForMedia(index, this.photographer); // Utilisez openLightboxForMedia
        }
      });
    });
  }

 
  // Gestion du bouton "J'aime"
  handleLikeButtonClick(index, likeButton) {
    const currentLikes = this.likes[index] || 0;

    if (likeButton.classList.contains("liked")) {
      // Si le média est déjà aimé, diminue le nombre de likes
      this.decrementLikes(index);
      likeButton.classList.remove("liked");
    } else {
      // Si le média n'est pas encore aimé, augmente le nombre de likes
      this.incrementLikes(index);
      likeButton.classList.add("liked");
    }

    // Mettez à jour l'affichage du nombre de likes
    this.updateLikesCount(index);
  }

  // Fonction pour incrémenter le nombre de likes
  incrementLikes(index) {
    this.likes[index] = (this.likes[index] || 0) + 1;
  }

  // Fonction pour décrémenter le nombre de likes
  decrementLikes(index) {
    if (this.likes[index] && this.likes[index] > 0) {
      this.likes[index] -= 1;
    }
  }

  // Met à jour l'affichage du nombre de likes
  updateLikesCount(index) {
    const likesCountElement = document.getElementById(`likes-${index}`);
    likesCountElement.textContent = `${this.likes[index] || 0} likes`;
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

  manageDropdown() {
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
      this.sortMediaByTitle();
    });

    const sortByDate = document.getElementById("sortByDate");
    sortByDate.addEventListener("click", () => {
      this.sortMediaByDate();
    });

    const sortByPopularity = document.getElementById("toggleDropdown");
    sortByPopularity.addEventListener("click", () => {
      this.sortMediaByPopularity();
    });
  }



 

  // Cette méthode affiche le média suivant dans la lightbox
  showNextMedia() {
    if (this.currentMediaIndex < this.totalMedia.length - 1) {
      this.currentMediaIndex++;
      this.openLightboxForMedia(this.currentMediaIndex, this.photographer);
    }
  }

  // Cette méthode affiche le média précédent dans la lightbox
  showPreviousMedia() {
    if (this.currentMediaIndex > 0) {
      this.currentMediaIndex--;
      this.openLightboxForMedia(this.currentMediaIndex, this.photographer);
    }
  }

  // Cette méthode ferme la lightbox
  closeLightbox() {
    this.lightbox.style.display = "none";
  }

}