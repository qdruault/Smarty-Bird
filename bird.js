class Bird {
    constructor() {
        this.y = height / 2;
        this.x = 64;
        this.radius = 32;
    }

    show() {
        fill(255);
        ellipse(this.x, this.y, this.radius, this.radius)
    }
}
