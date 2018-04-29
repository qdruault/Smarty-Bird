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
// SLider de vitesse du jeu.
let slider;

// Fonction d'initialisation.
function setup() {
    // Canvas initial.
    createCanvas(640, 480);
    // SLider pour gérer la Vitesse.
    slider = createSlider(1, 100, 1);
    // Création des oiseaux.
    for (var i = 0; i < TOTAL; i++) {
        birds[i] = new Bird();
    }
}

// Rendu graphique de chaque frame/
function draw() {

    for (var c = 0; c < slider.value(); c++) {
        // Nouveaux tuyaux.
        if (counter % 75 == 0) {
            pipes.push(new Pipe());
        }
        counter++;
        // Affichage de tous les tuyaux.
        for (var i = pipes.length-1; i >= 0; i--) {
            pipes[i].update();

            // L'oiseau touche ?
            for (var j = birds.length - 1; j >= 0; j--) {
                if (pipes[i].hits(birds[j])) {
                    // On retire l'oiseau touché.
                    savedBirds.push(birds[j]);
                    birds.splice(j, 1);
                }
            }

            // On retire les tuyaux hors écran.
            if (pipes[i].isOffscreen()) {
                pipes.splice(i, 1);
            }
        }

        // Pour chaque oiseau.
        for (bird of birds) {
            // Décide s'il doit sauter ou non.
            bird.think(pipes);
            // Mise à jour de la position de l'oiseau.
            bird.update();
        }
        // Nouvelle génération.
        if (birds.length === 0) {
            nextGeneration();
            pipes = [];
            counter = 0;
        }
    }

    // Afficahge graphique
    background(0);
    for (bird of birds) {
        bird.show()
    }
    for (pipe of pipes) {
        pipe.show()
    }
}
