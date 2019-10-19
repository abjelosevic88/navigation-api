const Operation = require('src/app/Operation');

class DeletePlace extends Operation {
  constructor({ placesRepository }) {
    super();
    this.placesRepository = placesRepository;
  }

  async execute(placeId) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      await this.placesRepository.remove(placeId);

      return this.response(SUCCESS);
    } catch(error) {
      if(error.message === this.ERRORS.NOT_FOUND) {
        return this.response(NOT_FOUND, error);
      }

      return this.response(ERROR, null, error);
    }
  }
}

DeletePlace.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = DeletePlace;
