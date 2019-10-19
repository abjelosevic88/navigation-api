const define = Object.defineProperty;
const { ERRORS } = require('src/interfaces/http/utils/consts');

class Operation {
  constructor() {
    this.ERRORS = ERRORS;
  }

  static setOutputs(outputs) {
    define(this.prototype, 'outputs', {
      value: createOutputs(outputs)
    });
  }

  response(status, payload = {}, error = null) {
    if(this.outputs[status]) {
      return {
        status,
        payload: payload ? payload : {},
        error: error ? new Error(error) : null
      };
    }

    throw new Error(`Invalid output "${status}" to operation ${this.constructor.name}.`);
  }
}

const createOutputs = (outputsArray) => {
  return outputsArray.reduce((obj, output) => {
    obj[output] = output;
    return obj;
  }, Object.create(null));
};

module.exports = Operation;
