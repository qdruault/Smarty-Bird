// Create a new generation of birds based on the previous one.
function nextGeneration() {
    // Normalise the score of each bird.
    calculateFitness();
    // Add some new birds.
    const bestPercent = savedBirds.length * 2 / 100;
    const wheelPercent = savedBirds.length * 50 / 100;
    const crossoverPercent = savedBirds.length * 48 / 100;
    // 2% best.
    for (var i = 0; i < bestPercent; i++) {
      birds.push(savedBirds[savedBirds.length - i - 1]);
    }
    // 50% roulette wheel.
    for (var i = 0; i < wheelPercent; i++) {
      let newBird = pickOne();
      newBird.mutate();
      birds.push(newBird);
    }
    // 48% crossover.
    for (var i = 0; i < crossoverPercent; i++) {
        // Choose the parents for the crossover.
        const parent1 = pickOne();
        const parent2 = pickOne();
        // Add the child.
        let newBird = createBird(parent1, parent2);
        newBird.mutate();
        birds.push(newBird);
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
    let pickedBird;
    do {
        // Pick a random bird.
        const randomIndex = Math.floor(random(0, savedBirds.length));
        const bird = savedBirds[randomIndex];
        // Pick a random number between 0 and 1 (the sum of all the fitness values).
        const randomValue = random(0, 1);
        // Check the fitness value of the chosen bird .
        if (bird.fitness > randomValue) {
            pickedBird = bird;
        }
    } while (!pickedBird);
    return pickedBird;
}

// Create a child through a crossover + mutation.
function createBird(parent1, parent2) {
  // Crossover the brain.
  const childBrain = new NeuralNetwork(parent1.brain, parent2.brain);
  const child = new Bird(childBrain);
  // Mutation.
  child.mutate();
  return child;
}
