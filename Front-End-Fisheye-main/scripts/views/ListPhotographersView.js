class ListPhotographersView {

    //je crée une fonction pour afficher les photographes
    displayPhotographersInfos(data) {
        // je récupére la référence de l'élément HTML où vous souhaitez afficher la liste des photographes
        const photographerSection = document.querySelector(".photographer_section");

        if (data && data.photographers) {
            data.photographers.forEach((photographer) => {
                const photographerElement = document.createElement("article");
                photographerElement.classList.add("photographer");

                photographerElement.innerHTML = `
            <img src="assets/photographers/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="${photographer.name}" class="portrait">
            <h2>${photographer.name}</h2>
            <p class="infoVille">${photographer.city}, ${photographer.country}</p>
            <p class="info">${photographer.tagline}</p>
            <p class="info">Price: ${photographer.price}</p>
        `;

                photographerSection.appendChild(photographerElement);
            });
        }
    }
}

