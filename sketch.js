// Nombres d'oiseaux.
const TOTAL = 250;
// Oiseaux en vie.
let birds = [];
// Sauvegarde de la génération en cours.
let savedBirds = [];
let pipes = [];
let score = 0;
let record = 0;
// Compteur de frames.
let counter = 0;

// Fonction d'initialisation.
function setup() {
    // Canvas initial.
    createCanvas(640, 480);
    // Création des oiseaux.
    for (var i = 0; i < TOTAL; i++) {
        birds[i] = new Bird();
        savedBirds[i] = new Bird();
    }
}

// Rendu graphique de chaque frame/
function draw() {
    background(0);

    // Nouveaux tuyaux.
    if (counter % 75 == 0) {
        pipes.push(new Pipe());
    }
    counter++;

    // Affichage de tous les tuyaux.
    for (var i = pipes.length-1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();

        // L'oiseau touche ?
        for (var j = birds.length - 1; j >= 0; j--) {
            if (pipes[i].hits(birds[j])) {

                console.log("HIT");
                // On retire l'oiseau touché.
                birds.splice(j, 1);
                // On repart de 0.
                /*score = 0;
                updateScore(score);*/
            }
        }

        // On retire les tuyaux hors écran.
        if (pipes[i].isOffscreen()) {
            pipes.splice(i, 1);
            // On augmente le score.
            /*score++;
            updateScore(score);
            // MAJ du record.
            if (score > record) {
                record = score;
                document.getElementById("highest-score").innerHTML = "Highest score: " + record;

            }
            */
        }
    }

    // Pour chaque oiseau.
    for (bird of birds) {
        // Décide s'il doit sauter ou non.
        bird.think(pipes);
        // Mise à jour de la position de l'oiseau.
        bird.update();
        // On affiche l'oiseau.
        bird.show();
    }

    // Nouvelle génération.
    if (birds.length === 0) {
        nextGeneration();
        pipes = [];
        counter = 0;
    }
}

// Met à jour le score en cours.
function updateScore(score) {
    document.getElementById("current-score").innerHTML = "Current score: " + score;
}
