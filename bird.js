var bestNN = {
  "input_nodes":5,
  "hidden_nodes":8,
  "output_nodes":2,
  "weights_ih": {"rows":8,"cols":5,"data":[[2.4821073837286205,28.63854003666989,3.717649016830177,2.614696558574553,23.02377110220721],[-18.74973649515909,-4.475466389540951,-7.450231845614142,-10.80243616682273,-13.105460007478904],[-4.212881639740708,3.9319800245648993,3.933502295927653,-39.84220103785636,-1.920931277243238],[2.6756681917747285,-10.539346204095184,-11.247613711675744,-13.231126671113374,3.2662652419221625],[-6.239612714675958,1.0852576030127061,-1.4547112356244687,8.566243396013878,-14.06405750948526],[1.8457821887584909,-2.8669941191699433,-10.812950105124262,-4.519996620815836,-12.132366314609657],[8.171848551356964,-2.9910380909964323,-3.373668998595989,-33.27038071081975,0.02763340498050898],[0.9748913350633936,0.49269994876346157,-0.11777012180144553,-4.595731685355821,-21.071026501523114]]},
  "weights_ho": {"rows":2,"cols":8,"data":[[0.7179326493311369,2.2464470042645055,-3.1242743441950767,2.4089127341818553,-12.982980871167504,1.32970985054151,9.3283334167187,-8.251924314548571],[1.8507355918574364,13.096477940929699,10.736108623743144,-2.2563442993849874,7.533769609812468,4.6282234612692275,-17.20506505753274,18.811452450838438]]},
  "bias_h": {"rows":8,"cols":1,"data":[[-1.3781264632022614],[-2.1278530088784002],[2.292889424675743],[-17.3462220093842],[6.7721585416279675],[8.81124455891871],[-0.5529862968829061],[-0.905677858865702]]},
  "bias_o": {"rows":2,"cols":1,"data":[[0.5763291665728764],[-0.7626966558278461]]},
  "learning_rate":0.1,
  "activation_function":{}
};

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
        this.radius = 20;
        // Gravity applied to the bird.
        this.gravity = 0.8;
        this.velocity = 0;
        this.airResistance = 0.95;
        // Leap strength.
        this.lift = -20;
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
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
    }

    // Update the position and score of the buird.
    update() {
        this.score++;
        this.velocity += this.gravity;
        this.velocity *= this.airResistance;
        this.y += this.velocity;
    }

    // The bird jumps.
    jump() {
        this.velocity += this.lift;
    }

    // Let the neural network think.
    think(pipes) {
        // Find the closest pipe.
        let closest = null;
        let closestDistance = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let distance = pipes[i].x - this.x;
            if (distance < closestDistance && distance > 0) {
                closestDistance = distance;
                closest = pipes[i];
            }
        }

        // Neural Network inputs.
        const inputs = [
            this.y / height,
            closest.top / height,
            closest.bottom / height,
            closest.x / width,
            this.velocity / 10
        ];
        // Result.
        const output = this.brain.predict(inputs);
        // Decide whether or not to jump.
        if (output[0] > output[1]) {
            this.jump();
        }
    }

    // Mutate the bird.
    mutate() {
        // Mutate the neural network.
        this.brain.mutate(mutate);
        // Mutate the colors.
        if (random(1) < 0.1) {
            this.red += random(2) - 1;
            this.blue += random(2) - 1;
            this.green += random(2) - 1;
        }
    }

    // Touches the bottom of the screen.
    isOffscreen() {
        return this.y > height;
    }

    // Create a copy of this bird
    copy() {
        return new Bird(this.brain, this.red, this.green, this.blue);
    }

    static createFitBird() {
      return new Bird(NeuralNetwork.deserialize(bestNN));
    }
}
