let bird;
let pipes = [];

// Fonction d'initialisation.
function setup() {
    // Canvas initial.
    createCanvas(640, 480);
    // L'oiseau.
    bird = new Bird();
    // Premier tuyau.
    pipes.push(new Pipe());
}

// Rendu graphique de chaque frame/
function draw() {
    background(0);
    // Affichage de tous les tuyaux.
    for (var i = pipes.length-1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();

        // On retire les tuyaux hors écran.
        if (pipes[i].isOffscreen()) {
            pipes.splice(i, 1);
        }
    }

    // Mise à jour de la position de l'oiseau.
    bird.update();
    // On affiche l'oiseau.
    bird.show();

    // Nouveaux tuyaux.
    if (frameCount % 75 == 0) {
        pipes.push(new Pipe());
    }
}

function keyPressed() {
    if (key === ' ') {
        bird.jump();
    }
}
