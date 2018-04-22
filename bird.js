class Bird {

    constructor() {
        // Position de départ.
        this.y = height / 2;
        this.x = 64;
        // Taille.
        this.radius = 32;
        // Gestion de la gravité.
        this.gravity = 1;
        this.velocity = 0;
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
        // Mise à jour de la coordonée.
        this.y += this.velocity;
    }
}
