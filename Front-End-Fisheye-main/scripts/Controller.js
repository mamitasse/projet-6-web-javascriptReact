class Controller {
  // Appel de la méthode fetchData et affichage des données
  async initListPhotographerPage() {
    let model = new Model();
    const data = await model.fetchData();

    if (data) {
      let view = new ListPhotographersView();
      view.displayPhotographersInfos(data);
    }
  }

  // Récupération de l'ID du photographe depuis l'URL
  getPhotographerIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get("id");
    return photographerId;
  }

  async initDetailPhotographerPage() {
    const photographerId = this.getPhotographerIdFromURL();

    // Récupérer les données du photographe depuis le modèle
    let model = new Model();
    const photographer = await model.getPhotographerById(photographerId);

    // Récupérer les médias du photographe
    const totalMedia = await model.getMediaByPhotographerId(
      parseInt(photographerId)
    );

    const detailPhotographerView = new DetailPhotographerView(
      photographer,
      totalMedia
    );
    detailPhotographerView.displayPhotographerDetails(photographer, totalMedia);
  }
}
