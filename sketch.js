let bird;
let pipes = [];
let score = 0;
let record = 0;

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

        // L'oiseau touche ?
        if (pipes[i].hits(bird)) {
            console.log("HIT");
            // On repart de 0.
            score = 0;
            updateScore(score);
        }

        // On retire les tuyaux hors écran.
        if (pipes[i].isOffscreen()) {
            pipes.splice(i, 1);
            // On augmente le score.
            score++;
            updateScore(score);
            // MAJ du record.
            if (score > record) {
                record = score;
                document.getElementById("highest-score").innerHTML = "Highest score: " + record;

            }
        }
    }

    // Décide s'il doit sauter ou non.
    bird.think(pipes);
    // Mise à jour de la position de l'oiseau.
    bird.update();
    // On affiche l'oiseau.
    bird.show();

    // Nouveaux tuyaux.
    if (frameCount % 75 == 0) {
        pipes.push(new Pipe());
    }
}

/*
function keyPressed() {
    if (key === ' ') {
        bird.jump();
    }
}
*/

// Met à jour le score en cours.
function updateScore(score) {
    document.getElementById("current-score").innerHTML = "Current score: " + score;

}
