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

    constructor(brain, img) {
        // Position de départ.
        this.y = height / 2;
        this.x = 64;
        // Taille.
        this.radius = 32;
        // Gestion de la gravité.
        this.gravity = 0.6;
        this.velocity = 0;
        this.airResistance = 0.9;
        // Force du saut.
        this.lift = -15;
        // Réseau de neurones de l'oiseau.
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(5, 8, 2);
        }
        // Score de l'oiseau = nb de frames vivant
        this.score = 0;
        this.fitness = 0;
        // Image.
        this.imageNumber = img || Math.floor(Math.random() * 14) + 1;
        this.bg = loadImage('img/face' + this.imageNumber + '.jpg');
    }

    // Rendu graphique.
    show() {
        //stroke(255);
        // Un peu transparent pour tous les voir.
        //fill(255, 100);
        image(this.bg, this.x - this.radius / 2, this.y - this.radius / 2, this.radius, this.radius )
        //ellipse(this.x, this.y, this.radius, this.radius)
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
        // Bornes dans l'écran.
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > height) {
            this.y = height;
        }
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
}
