
// Récupération de l'ID du photographe depuis l'URL
function getPhotographerIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get("id");
    return photographerId;
}

// Fonction pour afficher les détails du photographe
async function displayPhotographerDetails() {
    const photographerId = getPhotographerIdFromURL();

    // Récupérer les données du photographe depuis le modèle
    let model = new Model();
    const photographerData = await model.fetchData();

    // Trouver le photographe correspondant à l'ID
    const photographer = photographerData.photographers.find((p) => p.id === parseInt(photographerId));

    // Afficher les informations du photographe sur la page
    const photographerHeader = document.querySelector(".photograph-header");
    photographerHeader.innerHTML = `
        <div class="photographer-info">
            <div><h1>${photographer.name}</h1>
            <p>${photographer.city}, ${photographer.country}</p>
            <p>${photographer.tagline}</p></div>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <div class="photographer-photo">
            <img src="assets/photographers/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="${photographer.name}" />
        </div>
        </div>
        
    `;

    // Récupérer les médias du photographe
    const totalMedia = await model.getMediaByPhotographerId(parseInt(photographerId));

    // Afficher les médias du photographe
    const mediaContainer = document.getElementById("catalogue");
    totalMedia.forEach((media) => {
        mediaContainer.innerHTML += `
            <div class="media">
                <img src="assets/photographers/Sample Photos/${photographer.name}-${photographerId}/${media.image}" alt="${media.title}" />
                <p>${media.title}</p>
                <p>Likes: ${media.likes}</p>
                <p>Price: ${media.price}</p>
            </div>
        `;
    });
}

// Appeler la fonction pour afficher les détails du photographe lorsque la page est chargée
window.addEventListener("load", displayPhotographerDetails);