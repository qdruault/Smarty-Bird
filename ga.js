// Create a new generation of birds based on the previous one.
function nextGeneration() {
    // Normalise the score of each bird.
    calculateFitness();
    // Create the new generation basd on the user settings.
    const elitismPercent = select("#elitism-percentage").elt.innerHTML;
    const wheelPercent = select("#wheel-percentage").elt.innerHTML;
    const crossoverPercent = select("#crossover-percentage").elt.innerHTML;
    // Elitism.
    for (var i = 0; i < elitismPercent; i++) {
        let bestBird = savedBirds[savedBirds.length - i - 1].copy();
        birds.push(bestBird);
    }
    // Roulette wheel.
    for (var i = 0; i < wheelPercent; i++) {
        let newBird = pickOne();
        newBird.mutate();
        birds.push(newBird);
    }
    // Crossover.
    const crossoverType = document.querySelector('input[name=crossover]:checked').value;
    for (var i = 0; i < crossoverPercent; i++) {
        // Choose the parents for the crossover.
        const parent1 = pickOne();
        const parent2 = pickOne();
        // Add the child.
        let newBird = createBird(parent1, parent2, crossoverType);
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
    return pickedBird.copy();
}

// Create a child through a crossover + mutation.
function createBird(parent1, parent2, crossoverType) {
  // Crossover the brain.
  const childBrain = new NeuralNetwork(parent1.brain, parent2.brain, crossoverType);
  // Mix the colors.
  const newRed = (parent1.red + parent2.red) / 2;
  const newGreen = (parent1.green + parent2.green) / 2;
  const newBlue = (parent1.blue + parent2.blue) / 2;
  const child = new Bird(childBrain, newRed, newGreen, newBlue);
  // Mutation.
  child.mutate();
  return child;
}
