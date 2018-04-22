let bird;

// Fonction d'initialisation.
function setup() {
    // Canvas initial.
    createCanvas(400, 600);
    // L'oiseau.
    bird = new Bird();
}

// Rendu graphique de chaque frame/
function draw() {
    background(0);
    // Mise à jour de la position de l'oiseau.
    bird.update();
    // On affiche l'oiseau.
    bird.show();
}

function keyPressed() {
    if (key === ' ') {
        bird.jump();
    }
}
