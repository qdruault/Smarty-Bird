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
    }

    // Quand on fait sauter l'oiseau.
    jump() {
        this.velocity += this.lift;
    }
}
