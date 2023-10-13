class DetailPhotographerView {
  constructor() {
    this.totalMedia = [];
    this.currentMediaIndex = 0;
    this.lightbox = document.getElementById("lightbox");
    this.lightboxMedia = document.querySelector(".lightbox__media");
    this.lightboxTitle = document.querySelector(".lightbox__title");

    // Sélectionnez les boutons Next et Previous et ajoutez des écouteurs d'événements
    this.nextButton = document.querySelector(".lightbox__next");
    this.previousButton = document.querySelector(".lightbox__previous");

    this.nextButton.addEventListener("click", () => {
      this.showNextMedia();
    });

    this.previousButton.addEventListener("click", () => {
      this.showPreviousMedia();
    });

    this.setupMediaEventHandlers();
  }

  displayPhotographerDetails(photographer, totalMedia) {
    this.totalMedia = totalMedia;
    this.photographer = photographer;

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

        mediaElement.addEventListener("click", () => {
          this.openLightbox(index, photographer);
        });
      }

      mediaContainer.appendChild(mediaElement);
    });
  }

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

  setupMediaEventHandlers() {
    const mediaElements = document.querySelectorAll("#catalogue .media img, #catalogue .media video");

    mediaElements.forEach((media, index) => {
      media.addEventListener("click", () => {
        this.openLightbox(index, this.photographer); // Utilisez this.photographer
      });
    });
  }

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

  showNextMedia() {
    if (this.currentMediaIndex < this.totalMedia.length - 1) {
      this.currentMediaIndex++;
      this.openLightbox(this.currentMediaIndex, this.photographer);
    }
  }

  showPreviousMedia() {
    if (this.currentMediaIndex > 0) {
      this.currentMediaIndex--;
      this.openLightbox(this.currentMediaIndex, this.photographer);
    }
  }

  closeLightbox() {
    this.lightbox.style.display = "none";
  }
}

const detailPhotographerView = new DetailPhotographerView();

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

const sortByTitle = document.getElementById("sortByTitle");
sortByTitle.addEventListener("click", () => {
  detailPhotographerView.sortMediaByTitle();
});

const sortByDate = document.getElementById("sortByDate");
sortByDate.addEventListener("click", () => {
  detailPhotographerView.sortMediaByDate();
});

const closeButton = document.querySelector(".close-btn");
closeButton.addEventListener("click", () => {
  detailPhotographerView.closeLightbox();
});