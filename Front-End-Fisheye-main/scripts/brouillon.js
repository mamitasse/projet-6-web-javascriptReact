
 // Fonction pour afficher la modal de contact
function displayModal() {
    const contactModal = document.getElementById("contact_modal");
    contactModal.style.display = "block";
  }
  
  // Fonction pour fermer la modal de contact
  function closeModal() {
    const contactModal = document.getElementById("contact_modal");
    contactModal.style.display = "none";
  }

  // Création d'une instance de Controller et initialisation de la page
  let controller = new Controller();
  controller.initDetailPhotographerPage();

  // je sélectionnez le sélecteur de tri
  const orderSelect = document.getElementById("orderSelect");

  // je cree une instance de DetailPhotographerView
  const detailPhotographerView = new DetailPhotographerView();

  // j'ajoute un gestionnaire d'événement pour le changement de sélection
  orderSelect.addEventListener("change", () => {
    const selectedOption = orderSelect.value;
    if (selectedOption === "pop") {
      // je triez les médias par popularité
      detailPhotographerView.sortMediaByPopularity();
    } else if (selectedOption === "date") {
      // je triez les médias par date
      detailPhotographerView.sortMediaByDate();
    } else if (selectedOption === "title") {
      // Triez les médias par titre
      detailPhotographerView.sortMediaByTitle();
    }
  });