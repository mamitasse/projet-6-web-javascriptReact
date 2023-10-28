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
                <a href="photographer.html?id=${photographer.id}" aria-label="View ${photographer.name}'s profile" tabindes="2">
                <img src="assets/photographers/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="${photographer.name}" class="portrait" >
                </a>
            <h2 >${photographer.name}</h2>
            <p class="infoVille" >${photographer.city}, ${photographer.country}</p>
            <p class="infoDoc" >${photographer.tagline}</p>
            <p class="infoPrix"> ${photographer.price}€/jour</p>
        `;
        photographerElement
          .querySelector("a")
          .addEventListener("click", (e) => {
            e.preventDefault(); // Empêche le lien de naviguer vers la page
            const photographerId = photographer.id;
            window.location.href = `photographer.html?id=${photographerId}`;
          });

        photographerSection.appendChild(photographerElement);
      });
    }
  }
}
