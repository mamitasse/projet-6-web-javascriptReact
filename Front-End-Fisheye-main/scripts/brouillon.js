// Gestionnaire d'événement pour le bouton de tri principal
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

// Gestionnaires d'événement pour les options de tri
const sortByTitle = document.getElementById("sortByTitle");
sortByTitle.addEventListener("click", () => {
  // Tri par titre
  detailPhotographerView.sortMediaByTitle();
  toggleDropdown();
});

const sortByDate = document.getElementById("sortByDate");
sortByDate.addEventListener("click", () => {
  // Tri par date
  detailPhotographerView.sortMediaByDate();
  toggleDropdown();
});
A