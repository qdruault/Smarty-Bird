// Crée une nouvelle génération d'oiseaux meilleure que la précédente.
function nextGeneration() {
    console.log("nouvelle génération");
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
        sum = sum + bird.score;
    }
    for (bird of savedBirds) {
        bird.fitness = bird.score / sum;
    }
}

// Choisit un oiseau à partir de sa fitness value.
function pickOne() {
    let index = 0;
    // Valeur entre 0 et 1
    let randomValue = random(1);
    while (randomValue > 0) {
        // On soustraie les fitness values des oiseaux
        // jusqu'à arriver à 0.
        // Donc plus la fitness est élevée, plus cet oiseau a de chance d'être celui choisi.
        randomValue -= savedBirds[index].fitness;
        index++;
    }
    index--;
    // On choisit l'oiseau.
    const bird = savedBirds[index];
    // On crée une copie avec une mutation.
    const child = new Bird(bird.brain);
    child.mutate();
    return child;
}
