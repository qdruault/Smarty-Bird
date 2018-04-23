class Bird {

    constructor() {
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
        this.brain = new NeuralNetwork(4, 4, 1);
    }

    // Rendu graphique.
    show() {
        fill(255);
        ellipse(this.x, this.y, this.radius, this.radius)
    }

    // Mise à jour à chaque frame.
    update() {
        // L'oiseau subit la gravité.
        this.velocity += this.gravity;
        // Resistance de l'air.
        this.velocity *= this.airResistance;
        // Mise à jour de la coordonée.
        this.y += this.velocity;
        // Borne dans l'écran.
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
    think() {
        // Paramètres d'entrée.
        const inputs = [1.0, 0.5, 0.2, 0.3];
        // Résultat.
        const output = this.brain.predict(inputs);
        // Saut.
        if (output[0] > 0.5) {
            this.jump();
        }
    }
}
