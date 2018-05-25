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
let difficultySlider;
let elitismSlider;
let wheelSlider;
// Nombre de générations;
let numberOfGenerations = 1;
// Record.
let maxScore = 0;
let currentScore = 0;
// Difficulty level.
let difficulty;
let pipesOccurrence;

// Initialise the sketch.
function setup() {
    // Game canvas.
    let canvas = createCanvas(windowWidth, 480);
    canvas.parent('canvas-holder');
    // Create the sliders.
    difficultySlider = createSlider(1, 3, 1);
    difficultySlider.parent('difficulty-slider-holder');
    speedSlider = createSlider(1, 1000, 100);
    speedSlider.parent('speed-slider-holder');
    selectionSlider = createSlider(1, 50, 2, 1);
    selectionSlider.parent('selection-slider-holder');
    // Initial population.
    for (var i = 0; i < TOTAL; i++) {
        birds[i] = new Bird();
    }
}

// Draw the game at each frame.
function draw() {
    // Difficulty update.
    if (difficultySlider.value() != difficulty) {
      difficulty = difficultySlider.value();
      // Reset highest score if difficulty has changed.
      maxScore = 0;
      select("#highest-score").elt.innerHTML = maxScore;
    }
    pipesOccurrence = 75;
    // Update sliders values.
    select("#game-speed").elt.innerHTML = speedSlider.value();
    select("#game-difficulty").elt.innerHTML = difficultySlider.value();
    select("#selection-percentage").elt.innerHTML = selectionSlider.value();

    for (var c = 0; c < speedSlider.value(); c++) {
        // Add a new pipe.
        if (counter % pipesOccurrence == 0) {
            pipes.push(new Pipe());
        }
        counter++;
        // Display all the pipes.
        for (var i = pipes.length-1; i >= 0; i--) {
            pipes[i].update();

            // Check if the bird hits the pipe or leave the screen.
            for (var j = birds.length - 1; j >= 0; j--) {
                if (pipes[i].hits(birds[j]) || birds[j].isOffscreen()) {
                  // Save this bird and remove it from the current population.
                  savedBirds.push(birds[j]);
                  birds.splice(j, 1);
                }
            }

            // Remove the pipes once they're gone.
            if (pipes[i].isOffscreen()) {
                pipes.splice(i, 1);
                // Update the score.
                currentScore++;
                select("#current-score").elt.innerHTML = currentScore;
                // New highscore ?
                if (currentScore > maxScore) {
                    maxScore = currentScore;
                    select("#highest-score").elt.innerHTML = maxScore;
                    // Change the color of the max score.
                    if (select("#highest-score").elt.className != "new-highscore") {
                      select("#highest-score").addClass("new-highscore");
                      select("#current-score").addClass("new-highscore");
                    }

                }
            }
        }

        // Make the birds think if they have to jump or not.
        for (bird of birds) {
            bird.think(pipes);
            // Update its position.
            bird.update();
        }
        // All birds died ?.
        if (birds.length === 0) {
            // Reset the score.
            currentScore = 0;
            select("#current-score").elt.innerHTML = currentScore;
            select("#highest-score").removeClass("new-highscore");
            select("#current-score").removeClass("new-highscore");
            nextGeneration();
            // Update the user interface.
            numberOfGenerations++;
            select("#generations-number").elt.innerHTML = numberOfGenerations;

            pipes = [];
            counter = 0;
        }
    }

    // Graphical display.
    clear();
    for (bird of birds) {
        bird.show()
    }
    for (pipe of pipes) {
        pipe.show()
    }
}
