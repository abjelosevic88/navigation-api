const Operation = require('src/app/Operation');

class UpdatePlace extends Operation {
  constructor({ placesRepository }) {
    super();
    this.placesRepository = placesRepository;
  }

  async execute(placeId, placeData) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.outputs;

    try {
      const place = await this.placesRepository.update(placeId, placeData);

      return this.response(SUCCESS, place);
    } catch(error) {
      if (error.message === this.ERRORS.VALIDATION) {
        return this.response(VALIDATION_ERROR, error);
      }

      if (error.message === this.ERRORS.NOT_FOUND) {
        return this.response(NOT_FOUND, error);
      }

      return this.response(ERROR, null, error);
    }
  }
}

UpdatePlace.setOutputs(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);

module.exports = UpdatePlace;
