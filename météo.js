// Récupérer la référence à l'élément div où vous afficherez les données
const resultatMeteoDiv = document.getElementById("resultatMeteo");

// Récupérer la valeur de la ville entrée par l'utilisateur
const villeInput = document.getElementById("ville");

// Écouter un événement sur le champ de texte pour déclencher la recherche lorsque l'utilisateur appuie sur Entrée
villeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        rechercherMeteo(villeInput.value);
    }
});

// Fonction pour effectuer la recherche de météo en fonction de la ville
function rechercherMeteo(ville) {
    // Vérifiez si la ville n'est pas vide
    if (ville.trim() === "") {
        resultatMeteoDiv.innerHTML = "Veuillez entrer une ville valide.";
        return;
    }

    // Faites la requête API avec la ville paramétrable
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${ville}?unitGroup=metric&key=MDQWKGGSA7KSP4WLAJD5R8AG4&contentType=json`)
        .then(response => {
            if (response.ok) {
                return response.json(); // Convertir la réponse en JSON
            } else {
                throw new Error('La requête a échoué');
            }
        })
        .then(data => {
            // Une fois que vous avez les données météo, vous pouvez les afficher dans la div
            resultatMeteoDiv.innerHTML = `
                <h3>Météo pour ${ville}</h3>
                <p>Température actuelle: ${data.currentConditions.temp}°C</p>
                <p>Conditions: ${data.currentConditions.conditions}</p>
                <p>Humidité: ${data.currentConditions.humidity}%</p>
            `;
        })
        .catch(err => {
            console.error(err);
            resultatMeteoDiv.innerHTML = "Une erreur s'est produite lors de la recherche de la météo.";
        });
    
}
