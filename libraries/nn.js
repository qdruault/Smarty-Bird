// Other techniques for learning

class ActivationFunction {
  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}

let sigmoid = new ActivationFunction(
  x => 1 / (1 + Math.exp(-x)),
  y => y * (1 - y)
);

let tanh = new ActivationFunction(
  x => Math.tanh(x),
  y => 1 - (y * y)
);


class NeuralNetwork {
  // TODO: document what a, b, c are
  constructor(a, b, c) {
    // Copy an existing NN.
    if (a instanceof NeuralNetwork && !b) {
      this.input_nodes = a.input_nodes;
      this.hidden_nodes = a.hidden_nodes;
      this.output_nodes = a.output_nodes;

      this.weights_ih = a.weights_ih.copy();
      this.weights_ho = a.weights_ho.copy();

      this.bias_h = a.bias_h.copy();
      this.bias_o = a.bias_o.copy();

      this.setLearningRate(a.learning_rate);
      this.setActivationFunction(a.activation_function);
    } else if (a instanceof NeuralNetwork && b instanceof NeuralNetwork) {
      // Crossover with 2 parents.
      this.input_nodes = a.input_nodes;
      this.hidden_nodes = a.hidden_nodes;
      this.output_nodes = a.output_nodes;

      this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
      this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
      this.bias_h = new Matrix(this.hidden_nodes, 1);
      this.bias_o = new Matrix(this.output_nodes, 1);

      switch (c) {
        case "1":
          // 1 point crossover.
          this.onePointCrossover(a, b);
          break;
        case "2":
          // 2 point crossover.
          this.twoPointCrossover(a, b);
          break;
        default:
          // Uniform crossover.
          this.uniformCrossover(a, b);
      }

      if (random(1) < 0.5) {
        this.setLearningRate(a.learning_rate);
      } else {
        this.setLearningRate(b.learning_rate);
      }

      if (random(1) < 0.5) {
        this.setActivationFunction(a.activation_function);
      } else {
        this.setActivationFunction(b.activation_function);
      }
      this.setLearningRate(a.learning_rate);
      this.setActivationFunction(a.activation_function);
    } else {
      // New NN.
      this.input_nodes = a;
      this.hidden_nodes = b;
      this.output_nodes = c;

      this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
      this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
      this.weights_ih.randomize();
      this.weights_ho.randomize();

      this.bias_h = new Matrix(this.hidden_nodes, 1);
      this.bias_o = new Matrix(this.output_nodes, 1);
      this.bias_h.randomize();
      this.bias_o.randomize();

      this.setLearningRate();
      this.setActivationFunction();
    }
  }

  onePointCrossover(parent1, parent2) {
    // Crossover of the weights.
    // Random split between 1 and n-1;
    const randomWeightsIhSplit = Math.floor(random(parent1.weights_ih.rows - 1)) + 1;
    // Crossover.
    for (var i = 0; i < parent1.weights_ih.cols; i++) {
      for (var j = 0; j < randomWeightsIhSplit; j++) {
        this.weights_ih.data[j][i] = parent1.weights_ih.data[j][i];
      }
      for (var j = randomWeightsIhSplit; j < parent1.weights_ih.rows; j++) {
        this.weights_ih.data[j][i] = parent2.weights_ih.data[j][i];
      }
    }

    // Random split between 1 and n-1;
    const randomWeightsHoSplit = Math.floor(random(parent1.weights_ho.rows - 1)) + 1;
    // Crossover.
    for (var i = 0; i < parent1.weights_ho.cols; i++) {
      for (var j = 0; j < randomWeightsHoSplit; j++) {
        this.weights_ho.data[j][i] = parent1.weights_ho.data[j][i];
      }
      for (var j = randomWeightsHoSplit; j < parent1.weights_ho.rows; j++) {
        this.weights_ho.data[j][i] = parent2.weights_ho.data[j][i];
      }
    }

    // Crossover of the biases.
    // Random split between 1 and n-1;
    const randomBiasHSplit = Math.floor(random(parent1.bias_h.rows - 1)) + 1;
    // Crossover.
    for (var i = 0; i < parent1.bias_h.cols; i++) {
      for (var j = 0; j < randomBiasHSplit; j++) {
        this.bias_h.data[j][i] = parent1.bias_h.data[j][i];
      }
      for (var j = randomBiasHSplit; j < parent1.bias_h.rows; j++) {
        this.bias_h.data[j][i] = parent2.bias_h.data[j][i];
      }
    }

    // Random split between 1 and n-1;
    const randomBiasOSplit = Math.floor(random(parent1.bias_o.rows - 1)) + 1;
    // Crossover.
    for (var i = 0; i < parent1.bias_o.cols; i++) {
      for (var j = 0; j < randomBiasOSplit; j++) {
        this.bias_o.data[j][i] = parent1.bias_o.data[j][i];
      }
      for (var j = randomBiasOSplit; j < parent1.bias_o.rows; j++) {
        this.bias_o.data[j][i] = parent2.bias_o.data[j][i];
      }
    }
  }

  twoPointCrossover(parent1, parent2) {
    // Crossover of the weights.
    // 1st split between 1 and n-2;
    const firstWeightsIhSplit = Math.floor(random(parent1.weights_ih.rows - 2)) + 1;
    // 2nd split between the first one and n-1;
    const secondWeightsIhSplit = Math.floor(random(firstWeightsIhSplit, parent1.weights_ih.rows - 1)) + 1;
    // Crossover.
    for (var i = 0; i < parent1.weights_ih.cols; i++) {
      for (var j = 0; j < firstWeightsIhSplit; j++) {
        this.weights_ih.data[j][i] = parent1.weights_ih.data[j][i];
      }
      for (var j = firstWeightsIhSplit; j < secondWeightsIhSplit; j++) {
        this.weights_ih.data[j][i] = parent2.weights_ih.data[j][i];
      }
      for (var j = secondWeightsIhSplit; j < parent1.weights_ih.rows; j++) {
        this.weights_ih.data[j][i] = parent1.weights_ih.data[j][i];
      }
    }

    // Random split between 1 and n-2;
    const firstWeightsHoSplit = Math.floor(random(parent1.weights_ho.rows - 2)) + 1;
    // 2nd split between the first one and n-1;
    const secondWeightsHoSplit = Math.floor(random(firstWeightsHoSplit, parent1.weights_ho.rows - 1)) + 1;
    // Crossover.
    for (var i = 0; i < parent1.weights_ho.cols; i++) {
      for (var j = 0; j < firstWeightsHoSplit; j++) {
        this.weights_ho.data[j][i] = parent1.weights_ho.data[j][i];
      }
      for (var j = firstWeightsHoSplit; j < secondWeightsHoSplit; j++) {
        this.weights_ho.data[j][i] = parent2.weights_ho.data[j][i];
      }
      for (var j = secondWeightsHoSplit; j < parent1.weights_ho.rows; j++) {
        this.weights_ho.data[j][i] = parent1.weights_ho.data[j][i];
      }
    }

    // Crossover of the biases.
    // Random split between 1 and n-2;
    const firstBiasHSplit = Math.floor(random(parent1.bias_h.rows - 2)) + 1;
    // 2nd split between the first one and n-1;
    const secondBiasHSplit = Math.floor(random(firstBiasHSplit, parent1.bias_h.rows - 1)) + 1;
    // Crossover.
    for (var i = 0; i < parent1.bias_h.cols; i++) {
      for (var j = 0; j < firstBiasHSplit; j++) {
        this.bias_h.data[j][i] = parent1.bias_h.data[j][i];
      }
      for (var j = firstBiasHSplit; j < secondBiasHSplit; j++) {
        this.bias_h.data[j][i] = parent2.bias_h.data[j][i];
      }
      for (var j = secondBiasHSplit; j < parent1.bias_h.rows; j++) {
        this.bias_h.data[j][i] = parent1.bias_h.data[j][i];
      }
    }

    // Random split between 1 and n-2;
    const firstBiasOSplit = Math.floor(random(parent1.bias_o.rows - 2)) + 1;
    // 2nd split between the first one and n-1;
    const secondBiasOSplit = Math.floor(random(firstBiasOSplit, parent1.bias_o.rows - 1)) + 1;
    // Crossover.
    for (var i = 0; i < parent1.bias_o.cols; i++) {
      for (var j = 0; j < firstBiasOSplit; j++) {
        this.bias_o.data[j][i] = parent1.bias_o.data[j][i];
      }
      for (var j = firstBiasOSplit; j < secondBiasOSplit; j++) {
        this.bias_o.data[j][i] = parent2.bias_o.data[j][i];
      }
      for (var j = secondBiasOSplit; j < parent1.bias_o.rows; j++) {
        this.bias_o.data[j][i] = parent1.bias_o.data[j][i];
      }
    }
  }

  uniformCrossover(parent1, parent2) {
    console.log("uniformCrossover");
    noLoop();
  }

  predict(input_array) {

    // Generating the Hidden Outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    // activation function!
    hidden.map(this.activation_function.func);

    // Generating the output's output!
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(this.activation_function.func);

    // Sending back to the caller!
    return output.toArray();
  }

  setLearningRate(learning_rate = 0.1) {
    this.learning_rate = learning_rate;
  }

  setActivationFunction(func = sigmoid) {
    this.activation_function = func;
  }

  train(input_array, target_array) {
    // Generating the Hidden Outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    // activation function!
    hidden.map(this.activation_function.func);

    // Generating the output's output!
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(this.activation_function.func);

    // Convert array to matrix object
    let targets = Matrix.fromArray(target_array);

    // Calculate the error
    // ERROR = TARGETS - OUTPUTS
    let output_errors = Matrix.subtract(targets, outputs);

    // let gradient = outputs * (1 - outputs);
    // Calculate gradient
    let gradients = Matrix.map(outputs, this.activation_function.dfunc);
    gradients.multiply(output_errors);
    gradients.multiply(this.learning_rate);


    // Calculate deltas
    let hidden_T = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);

    // Adjust the weights by deltas
    this.weights_ho.add(weight_ho_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias_o.add(gradients);

    // Calculate the hidden layer errors
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);

    // Calculate hidden gradient
    let hidden_gradient = Matrix.map(hidden, this.activation_function.dfunc);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.learning_rate);

    // Calcuate input->hidden deltas
    let inputs_T = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

    this.weights_ih.add(weight_ih_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias_h.add(hidden_gradient);

    // outputs.print();
    // targets.print();
    // error.print();
  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }
    let nn = new NeuralNetwork(data.input_nodes, data.hidden_nodes, data.output_nodes);
    nn.weights_ih = Matrix.deserialize(data.weights_ih);
    nn.weights_ho = Matrix.deserialize(data.weights_ho);
    nn.bias_h = Matrix.deserialize(data.bias_h);
    nn.bias_o = Matrix.deserialize(data.bias_o);
    nn.learning_rate = data.learning_rate;
    return nn;
  }

  // Adding function for neuro-evolution
  copy() {
    return new NeuralNetwork(this);
  }

  // Accept an arbitrary function for mutation
  mutate(func) {
    this.weights_ih.map(func);
    this.weights_ho.map(func);
    this.bias_h.map(func);
    this.bias_o.map(func);
  }
}
