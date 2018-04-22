class Pipe {
    constructor() {
        // Intervalle entre le haut et le bas.
        this.spacing = 175;
        // Position.
        this.top = random(height / 6, 3 / 4 * height);
        this.bottom = height - (this.top + this.spacing);
        this.x = width;
        // Largeur.
        this.w = 80;
        // Vitesse de déplacement.
        this.speed = 6;
        // Touché par l'oiseau ?
        this.highlight = false;
    }

    // Rendu graphique.
    show() {
        fill(255);
        // Rouge si l'oiseau touche.
        if (this.highlight) {
            fill(255, 0, 0);
        }
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height-this.bottom, this.w, this.bottom);
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
        if (bird.y < this.top || bird.y > height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                this.highlight = true;
                return true;
            }
        }
        this.highlight = false;
        return false;
    }
}
