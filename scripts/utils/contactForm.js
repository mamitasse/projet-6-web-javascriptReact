
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";

}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";

}
function displayThankYouMessage() {
  const thankYouMessage = document.getElementById("thank-you-message");
  thankYouMessage.style.display = "block";
}

function closeThankYouMessage() {
  const thankYouMessage = document.getElementById("thank-you-message");
  thankYouMessage.style.display = "none";
}



const contact_button = document.querySelector(".contact_button");

contact_button.addEventListener("click", function() {
 
  displayModal();
});

const envoyerButton = document.getElementById("envoyer-button");

envoyerButton.addEventListener("click", function () {
  // Traitez le formulaire ici, par exemple, en envoyant les données au serveur.

  // Redirigez ensuite l'utilisateur vers la page d'accueil.
  window.location.href = "./index.html"; // Remplacez "index.html" par l'URL de votre page d'accueil si nécessaire.
console.log(window.location.href)
});


