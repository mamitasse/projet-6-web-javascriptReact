class Model {
  // Variable statique data
  static data = null;

  // je créez la méthode fetchData pour récupérer les données
  async fetchData() {
    if (this.data == null) {
      try {
        const response = await fetch("./data/photographers.json");

        if (!response.ok) {
          throw new Error("Impossible de récupérer les données");
        }

        this.data = await response.json();
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données JSON :",
          error
        );
        return null;
      }
    }

    return this.data;
  }

  async getMediaByPhotographerId(photographerId) {
    let data = await this.fetchData();

    let totalMedia = [];
    for (let media of data.media) {
      if (media.photographerId === photographerId) {
        totalMedia.push(media);
      }
    }
    return totalMedia;
  }

  async getPhotographerById(photographerId) {
    let data = await this.fetchData();
    // Trouver le photographe correspondant à l'ID
    const photographer = data.photographers.find(
      (p) => p.id === parseInt(photographerId)
    );
    return photographer;
  }
}
