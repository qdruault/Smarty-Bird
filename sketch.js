// Number of birds.
const TOTAL = 500;
// Birds alive.
let birds = [];
// Dead birds from the current generation.
let savedBirds = [];
let pipes = [];
let score = 0;
let record = 0;
// Frames counter.
let counter = 0;
// Sliders.
let speedSlider;
let elitismSlider;
let wheelSlider;
// Nombre de générations;
let numberOfGenerations = 1;
// Record.
let maxScore = 0;
let currentScore = 0;
// Niveau de difficulté.
let difficulty;
let pipesOccurrence;

// Fonction d'initialisation.
function setup() {
    // Game canvas.
    let canvas = createCanvas(windowWidth, 480);
    canvas.parent('canvas-holder');
    // Create the sliders.
    speedSlider = createSlider(1, 10, 1);
    speedSlider.parent('speed-slider-holder');
    elitismSlider = createSlider(1, 10, 2, 1);
    elitismSlider.parent('elitism-slider-holder');
    wheelSlider = createSlider(1, 100, 50, 1);
    wheelSlider.parent('wheel-slider-holder');
    // Création des oiseaux.
    for (var i = 0; i < TOTAL; i++) {
        birds[i] = new Bird();
    }
}

// Rendu graphique de chaque frame/
function draw() {

    // MAJ de la difficulté.
    difficulty = document.querySelector('input[name=difficulty]:checked').value;
    if (difficulty == "1") {
        pipesOccurrence = 75;
    } else if (difficulty == "2") {
        pipesOccurrence = 60;
    } else {
        pipesOccurrence = 50;
    }
    // Update sliders values.
    select("#game-speed").elt.innerHTML = speedSlider.value();
    let elitismPercent = elitismSlider.value();
    let wheelPercent = wheelSlider.value();
    let crossoverPercent = 100 - elitismPercent - wheelPercent;
    // Adjust to make total = 100%.
    if (crossoverPercent < 0) {
        wheelSlider.value(wheelPercent - 1);
    }

    select("#elitism-percentage").elt.innerHTML = elitismSlider.value();
    select("#wheel-percentage").elt.innerHTML = wheelSlider.value();
    select("#crossover-percentage").elt.innerHTML = crossoverPercent;

    for (var c = 0; c < speedSlider.value(); c++) {
        // Nouveaux tuyaux.
        if (counter % pipesOccurrence == 0) {
            pipes.push(new Pipe());
        }
        counter++;
        // Affichage de tous les tuyaux.
        for (var i = pipes.length-1; i >= 0; i--) {
            pipes[i].update();

            // L'oiseau est mort ? (touche le pipe ou le bas de l'écran)
            for (var j = birds.length - 1; j >= 0; j--) {
                if (pipes[i].hits(birds[j]) || birds[j].isOffscreen()) {
                  // On retire l'oiseau touché.
                  savedBirds.push(birds[j]);
                  birds.splice(j, 1);
                }
            }

            // On retire les tuyaux hors écran.
            if (pipes[i].isOffscreen()) {
                pipes.splice(i, 1);
                // MAJ du score.
                currentScore++;
                select("#current-score").elt.innerHTML = currentScore;
                if (currentScore > maxScore) {
                    maxScore = currentScore;
                    select("#highest-score").elt.innerHTML = maxScore;
                }
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
            // RAZ du score.
            currentScore = 0;
            select("#current-score").elt.innerHTML = currentScore;
            nextGeneration();
            // MAJ de l'interface.
            numberOfGenerations++;
            select("#generations-number").elt.innerHTML = numberOfGenerations;

            pipes = [];
            counter = 0;
        }
    }

    // Afficahge graphique
    clear();
    for (bird of birds) {
        bird.show()
    }
    for (pipe of pipes) {
        pipe.show()
    }
}
