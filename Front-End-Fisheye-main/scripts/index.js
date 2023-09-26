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



// je créez la méthode fetchData pour récupérer les données
async function fetchData() {
  try {
    const response = await fetch("./data/photographers.json");
    
    if (!response.ok) {
      throw new Error("Impossible de récupérer les données");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des données JSON :", error);
    return null;
  }
}

//je crée une fonction pour afficher les photographes
function displayPhotographersInfos(data) {
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

// Appel de la méthode fetchData et affichage des données
async function init() {
  const data = await fetchData();
  if (data) {
    displayPhotographersInfos(data);
  }
}

init();