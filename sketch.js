let bird;

// Fonction d'initialisation.
function setup() {
    // Canvas initial.
    createCanvas(400, 600);
    // L'oiseeau.
    bird = new Bird();
}

// Rendu graphique de chaque frame/
function draw() {
    background(0);
    // On affiche l'oiseau.
    bird.show();
}
