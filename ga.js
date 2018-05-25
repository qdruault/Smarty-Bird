// Create a new generation of birds based on the previous one.
function nextGeneration() {
    // Normalise the score of each bird.
    calculateFitness();
    // Create the new generation basd on the user settings.
    const selectionProcess = document.querySelector('input[name=selection-process]:checked').value;
    const selectionPercentage = select("#selection-percentage").elt.innerHTML;
    const numberOfBirds = TOTAL * selectionPercentage / 100;
    const crossoverType = document.querySelector('input[name=crossover]:checked').value;
    // Elitism.
    if (selectionProcess == "elitism") {
        // Copy the best ones.
        for (var i = 0; i < numberOfBirds; i++) {
            let bestBird = savedBirds[savedBirds.length - i - 1].copy();
            birds.push(bestBird);
        }
        // Crossover with the best ones.
        while (birds.length < TOTAL) {
            birds.push(elitismCrossover(numberOfBirds, crossoverType));
        }
    } else {
        // Crossover with some random birds.
        while (birds.length < TOTAL) {
            birds.push(rouletteWheelCrossover());
        }
        // Roulette wheel to choose the birds for the crossover.
        for (var i = 0; i < numberOfBirds; i++) {
            let newBird = pickOne();
            newBird.mutate();
            birds.push(newBird);
        }

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

function elitismCrossover(numberOfBirds, crossoverType) {
    const firstBirdIndex = Math.floor(random(numberOfBirds));
    let secondBirdIndex;
    // Find 2 different birds.
    do {
        secondBirdIndex = Math.floor(random(numberOfBirds));
    } while (firstBirdIndex == secondBirdIndex);

    const firstParent = savedBirds[savedBirds.length - 1 - firstBirdIndex];
    const secondParent = savedBirds[savedBirds.length - 1 - secondBirdIndex];
    // Crossover.
    return createBird(firstParent, secondParent, crossoverType);
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
