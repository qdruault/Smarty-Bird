// Create a new generation of birds based on the previous one.
function nextGeneration() {
    // Normalise the score of each bird.
    calculateFitness();
    // Add some new birds.
    for (var i = 0; i < savedBirds.length; i++) {
        birds.push(pickOne());
    }
    // Clear the old generation.
    savedBirds = [];
}

// Calculate the fitness value (0-1) of each bird
function calculateFitness() {
    let sum = 0;
    for (bird of savedBirds) {
        sum = sum + bird.score;
    }
    for (bird of savedBirds) {
        bird.fitness = bird.score / sum;
    }
}

// Pick a bird. The higher a bird's fitness value
// the more likely it is to be picked.
// Returns the bird.
function pickOne() {
    let child;
    do {
        // Pick a random bird.
        const randomIndex = Math.floor(random(0, savedBirds.length));
        const bird = savedBirds[randomIndex];
        // Pick a random number between 0 and 1 (the sum of all the fitness values).
        const randomValue = random(0, 1);
        // Check the fitness value of the chosen bird .
        if (bird.fitness > randomValue) {
            // On crée une copie avec une mutation.
            child = new Bird(bird.brain, bird.imageNumber);
            child.mutate();
        }
    } while (!child);
    return child;
}
