class Controller {
    // Appel de la méthode fetchData et affichage des données
    async initListPhotographerPage() {
        
        let model = new Model();
        const data = await model.fetchData();
        const data2 = await model.fetchData();
        const data3 = await model.fetchData();
        if (data) {
            let view = new ListPhotographersView();
            view.displayPhotographersInfos(data);
        }
    }

    async initDetailPhotographerPage() {
        // Récupération de l'id du photographe dans l'url. 
      
    function getPhotographerIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get("id");
    return photographerId;
}

// Utilisation de la fonction pour obtenir l'ID du photographe actuellement affiché
const photographerId = getPhotographerIdFromURL();

        let model = new Model();
        // Récupération des infos du photographe
        
    // Récupérer les médias du photographe
    
        

        // Récupération des médias du photographe
        const totalMedia = await model.getMediaByPhotographerId(parseInt(photographerId));
        
        
        
        // Affichage des infos. 
    }


}
