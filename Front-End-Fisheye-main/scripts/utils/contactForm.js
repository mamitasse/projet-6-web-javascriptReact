function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
const contact_button = document.querySelector(".contact_button");

contact_button.addEventListener("click", function () {
  displayModal();
});

// Sélectionnez le formulaire
const form = document.querySelector("form");

// Écoutez l'événement "submit" sur le formulaire
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche l'envoi par défaut du formulaire

  // Récupérez les valeurs des champs du formulaire
  const prenom = document.querySelector("#prenom").value;
  const nom = document.querySelector("#nom").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  // Affichez les valeurs dans la console
  console.log("Prénom:", prenom);
  console.log("Nom:", nom);
  console.log("Email:", email);
  console.log("Message:", message);

  // Redirigez l'utilisateur vers la page d'accueil

  // Vous pouvez également envoyer ces données à un serveur ici si nécessaire
});

// La console affichera les données lorsque le formulaire est soumis.
