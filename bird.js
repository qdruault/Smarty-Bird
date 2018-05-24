// Mutation function to be passed into bird.brain
function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

class Bird {

    constructor(brain, red, green, blue) {
        // Start position.
        this.y = height / 2;
        this.x = 64;
        // Size.
        this.radius = 20;
        // Gravity applied to the bird.
        this.gravity = 0.8;
        this.velocity = 0;
        this.airResistance = 0.95;
        // Leap strength.
        this.lift = -20;
        // Neural Network of the bird.
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(5, 8, 2);
        }
        // Bird score = number of frames alive.
        this.score = 0;
        this.fitness = 0;
        // Display.
        if (red) {
          this.red = red;
          this.green = green;
          this.blue = blue;
        } else {
          this.red = Math.floor(random(255));
          this.green = Math.floor(random(255));
          this.blue = Math.floor(random(255));
        }
    }

    // Graphical rendering.
    show() {
        stroke(255);
        // Color of the bird with transparency.
        fill(this.red, this.green, this.blue, 100);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
    }

    // Update the position and score of the buird.
    update() {
        this.score++;
        this.velocity += this.gravity;
        this.velocity *= this.airResistance;
        this.y += this.velocity;
    }

    // The bird jumps.
    jump() {
        this.velocity += this.lift;
    }

    // Let the neural network think.
    think(pipes) {
        // Find the closest pipe.
        let closest = null;
        let closestDistance = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let distance = pipes[i].x - this.x;
            if (distance < closestDistance && distance > 0) {
                closestDistance = distance;
                closest = pipes[i];
            }
        }

        // Neural Network inputs.
        const inputs = [
            this.y / height,
            closest.top / height,
            closest.bottom / height,
            closest.x / width,
            this.velocity / 10
        ];
        // Result.
        const output = this.brain.predict(inputs);
        // Decide whether or not to jump.
        if (output[0] > output[1]) {
            this.jump();
        }
    }

    // Mutate the neural network.
    mutate() {
        this.brain.mutate(mutate);
    }

    // Touches the bottom of the screen.
    isOffscreen() {
        return this.y > height;
    }

    // Create a copy of this bird
    copy() {
        return new Bird(this.brain, this.red, this.green, this.blue);
    }
}
