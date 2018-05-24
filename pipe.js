class Pipe {
    constructor() {
      // Space between the top and the bottom.
        if (difficulty == "1") {
            this.spacing = 180;
        } else if (difficulty == "2") {
            this.spacing = 160;
        } else {
            this.spacing = 140;
        }
        // Speed of the pipe.
        this.speed = 6;
        // Position.
        this.top = random(30, height - this.spacing - 30 );
        this.bottom = this.top + this.spacing;
        this.x = width;
        this.width = 80;
    }

    // Display the pipe.
    show() {
        fill(255);
        rect(this.x, 0, this.width, this.top);
        rect(this.x, this.bottom, this.width, height-this.bottom);
    }

    // Move the pipe.
    update() {
        this.x -= this.speed;
    }

    // True if the pipe is no longer on the screen.
    isOffscreen() {
        return this.x < -this.width;
    }

    // Touch a bird.
    hits(bird) {
      if (bird.x > this.x && bird.x < this.x + this.width) {
        if ((bird.y - bird.radius) < this.top || (bird.y + bird.radius) > this.bottom) {
          return true;
        }
      }
      return false;
    }
}
