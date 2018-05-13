class Pipe {
    constructor() {
        if (difficulty == "EPF") {
            // Intervalle entre le haut et le bas.
            this.spacing = 180;
        } else if (difficulty == "UTT") {
            // Intervalle entre le haut et le bas.
            this.spacing = 150;
        } else {
            // UTC sinon.
            // Intervalle entre le haut et le bas.
            this.spacing = 120;
        }
        // Vitesse de déplacement.
        this.speed = 6;
        // Position.
        this.top = random(30, height - this.spacing - 30 );
        this.bottom = this.top + this.spacing;
        this.x = width;
        // Largeur.
        this.w = 80;
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
        if (bird.y < this.top || bird.y > this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                return true;
            }
        }
        return false;
    }
}
