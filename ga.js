// Crée une nouvelle génération d'oiseaux meilleure que la précédente.
function nextGeneration() {
    calculateFitness();
    for (var i = 0; i < TOTAL; i++) {
        birds[i] = pickOne();
    }
}

// Calcule la fitness value, une valeur normalisée
// du score entre 0 et 1
function calculateFitness() {
    let sum = 0;
    for (bird of savedBirds) {
        sum += bird.score;
    }
    for (bird of savedBirds) {
        bird.fitness = bird.score / sum;
    }
}

// Choisit un oiseau à partir de sa fitness value.
function pickOne() {
    // On choisit un oiseau au hasard.
    const bird = random(savedBirds);
    // On crée une copie avec une mutation.
    const child = new Bird(bird.brain);
    child.mutate();
    return child;
}
