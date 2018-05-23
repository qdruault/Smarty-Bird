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
        this.radius = 32;
        // Gravity applied to the bird.
        this.gravity = 0.6;
        this.velocity = 0;
        this.airResistance = 0.9;
        // Leap strength.
        this.lift = -15;
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
        ellipse(this.x, this.y, this.radius, this.radius)
    }

    // Mise à jour à chaque frame.
    update() {
        // Augmentation du score.
        this.score++;
        // L'oiseau subit la gravité.
        this.velocity += this.gravity;
        // Resistance de l'air.
        this.velocity *= this.airResistance;
        // Mise à jour de la coordonée.
        this.y += this.velocity;
    }

    // Quand on fait sauter l'oiseau.
    jump() {
        this.velocity += this.lift;
    }

    // Logique du réseau de neurones.
    think(pipes) {
        // On cherche le tuyau le plus proche.
        let closest = null;
        let closestDistance = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let distance = pipes[i].x - this.x;
            if (distance < closestDistance && distance > 0) {
                closestDistance = distance;
                closest = pipes[i];
            }
        }

        // Paramètres d'entrée.
        const inputs = [
            this.y / height,
            closest.top / height,
            closest.bottom / height,
            closest.x / width,
            this.velocity / 10
        ];
        // Résultat.
        const output = this.brain.predict(inputs);
        // Saut.
        if (output[0] > output[1]) {
            this.jump();
        }
    }

    // Mutation du réseau de neurones.
    mutate() {
        this.brain.mutate(mutate);
    }

    // Touche le bas de l'écran.
    isOffscreen() {
        return this.y > height;
    }

    // Create a copy of this bird
    copy() {
        return new Bird(this.brain, this.red, this.green, this.blue);
    }
}
