class DetailPhotographerView {
    // Récupération de l'ID du photographe depuis l'URL
    getPhotographerIdFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      const photographerId = urlParams.get("id");
      return photographerId;
    }
  
    // Fonction pour afficher les détails du photographe
    async displayPhotographerDetails() {
      const photographerId = this.getPhotographerIdFromURL();
  
      // Récupérer les données du photographe depuis le modèle
      let model = new Model();
      const photographerData = await model.fetchData();
  
      // Trouver le photographe correspondant à l'ID
      const photographer = photographerData.photographers.find(
        (p) => p.id === parseInt(photographerId)
      );
  
      // Afficher les informations du photographe sur la page
      const photographerHeader = document.querySelector(".photograph-header");
      photographerHeader.innerHTML = `
        <div class="photographer-info">
          <h1>${photographer.name}</h1>
          <p>${photographer.city}, ${photographer.country}</p>
          <p>${photographer.tagline}</p>
        </div> 
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <div class="photographer-photo">
          <img src="assets/photographers/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="${photographer.name}" />
        </div>
      `;
  
      // Récupérer les médias du photographe
      const totalMedia = await model.getMediaByPhotographerId(
        parseInt(photographerId)
      );
  
      // Afficher les médias du photographe
      const mediaContainer = document.getElementById("catalogue");
  
      totalMedia.forEach((media) => {
        const mediaElement = document.createElement("div"); // Créez un nouvel élément pour chaque média
        mediaElement.classList.add("media"); // Ajoutez la classe "media" à l'élément
  
        // Définissez les attributs data-likes, data-date et data-title en utilisant les valeurs de l'objet media
        mediaElement.setAttribute("data-likes", media.likes);
        mediaElement.setAttribute("data-date", media.date);
        mediaElement.setAttribute("data-title", media.title);
  
        if (media.image) {
          mediaElement.innerHTML = `
            <img src="assets/photographers/Sample Photos/${photographer.name}-${photographerId}/${media.image}" alt="${media.title}" />
            <p>${media.title}</p>
            <p>Likes: ${media.likes}</p>
            <p>Price: ${media.price}</p>
          `;
        } else if (media.video) {
          mediaElement.innerHTML = `
            <video src="assets/photographers/Sample Photos/${photographer.name}-${photographerId}/${media.video}" controls autoplay></video>
            <p>${media.title}</p>
            <p>Likes: ${media.likes}</p>
            <p>Price: ${media.price}</p>
          `;
        }
  
        mediaContainer.appendChild(mediaElement); // Ajoutez l'élément au conteneur des médias
      });
    }
  
    // Méthode pour trier les médias par popularité
    sortMediaByPopularity() {
      const mediaContainer = document.getElementById("catalogue");
      const mediaElements = Array.from(mediaContainer.querySelectorAll(".media"));
  
      // Triez les médias par popularité (du plus élevé au plus bas)
      mediaElements.sort((a, b) => {
        const likesA = parseInt(a.getAttribute("data-likes"));
        const likesB = parseInt(b.getAttribute("data-likes"));
        return likesB - likesA;
      });
  
      // Réorganisez les éléments dans le conteneur
      mediaElements.forEach((mediaElement) => {
        mediaContainer.appendChild(mediaElement);
      });
    }
  
    // Méthode pour trier les médias par date
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
  
    // Méthode pour trier les médias par titre
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
  }
  
  window.addEventListener("load", () => {
    const detailPhotographerView = new DetailPhotographerView();
    detailPhotographerView.displayPhotographerDetails();
  
    // je sélectionne le sélecteur de tri
    const orderSelect = document.getElementById("orderSelect");
  
    // j'ajoute un gestionnaire d'événement pour le changement de sélection
    orderSelect.addEventListener("change", () => {
      const selectedOption = orderSelect.value;
      if (selectedOption === "pop") {
        // je trie les médias par popularité
        detailPhotographerView.sortMediaByPopularity();
      } else if (selectedOption === "date") {
        // je trie les médias par date
        detailPhotographerView.sortMediaByDate();
      } else if (selectedOption === "title") {
        // je triez les médias par titre
        detailPhotographerView.sortMediaByTitle();
      }
    });
  });