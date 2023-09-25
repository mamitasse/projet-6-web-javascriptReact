// je récupére la référence de l'élément HTML où vous souhaitez afficher la liste des photographes
const photographerSection = document.querySelector(".photographer_section");

function getUserCardDOM() {
  const article = document.createElement("article");
  const img = document.createElement("img");
  img.setAttribute("src", picture);
  const h2 = document.createElement("h2");
  h2.textContent = name;
  article.appendChild(img);
  article.appendChild(h2);
  return article;
}

// j'utilise fetch() pour charger le fichier JSON local
function photographerTemplate(data) {
  const { name, portrait } = data;
  const picture = `assets/photographers/${portrait}`;
return { name, picture, getUserCardDOM };
}

fetch("./data/photographers.json")
  .then((response) => response.json())
  .then((data) => {
    // Maintenant, on a acces aux données JSON dans la variable "data"

  
    if (data.photographers) {
      // on parcoure le tableau des photographes et crée un élément HTML pour chacun d'eux
      data.photographers.forEach((photographer) => {
        const photographerElement = document.createElement("article");
        photographerElement.classList.add("photographer");

        // je crée le contenu HTML pour chaque photographe 
        photographerElement.innerHTML = `
          <img src="assets/photographers/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="${photographer.name}" class="portrait">
          <h2>${photographer.name}</h2>
          <p class="infoVille">${photographer.city}, ${photographer.country}</p>
          <p class="info">${photographer.tagline}</p>
          <p class="info">Price: ${photographer.price}</p>
        `;

        // j'ajoute l'élément du photographe à la section des photographes
        photographerSection.appendChild(photographerElement);
      });
    }
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des données JSON :",
      error
    );
  });
