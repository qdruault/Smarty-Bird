class Pipe {
    constructor() {
        // Intervalle entre le haut et le bas.
        this.spacing = 180;
        // Position.
        this.top = random(30, height - this.spacing - 30 );
        this.bottom = this.top + this.spacing;
        this.x = width;
        // Largeur.
        this.w = 80;
        // Vitesse de déplacement.
        this.speed = 6;
    }

    // Rendu graphique.
    show() {
        fill(255);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, this.bottom, this.w, height-this.bottom);
    }

    // Mise à jour à chaque frame.
    update() {
        this.x -= this.speed;
    }

    // Permet de savoir si le tuyau n'est plus à l'écran.
    isOffscreen() {
        return this.x < -this.w;
    }

    // Contact avec l'oiseau.
    hits(bird) {
        if (bird.y - bird.radius < this.top || bird.y + bird.radius > this.bottom) {
            if (bird.x + bird.radius > this.x && bird.x - bird.radius < this.x + this.w) {
                return true;
            }
        }
        return false;
    }
}
