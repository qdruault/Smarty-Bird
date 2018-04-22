let bird;
let pipes = [];

// Fonction d'initialisation.
function setup() {
    // Canvas initial.
    createCanvas(400, 600);
    // L'oiseau.
    bird = new Bird();
    // Premier tuyau.
    pipes.push(new Pipe());
}

// Rendu graphique de chaque frame/
function draw() {
    background(0);
    // Affichage de tous les tuyaux.
    pipes.forEach((pipe) => {
        pipe.show();
        pipe.update();
    })

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
