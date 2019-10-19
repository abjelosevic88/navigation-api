const Operation = require('src/app/Operation');

class GetPlace extends Operation {
  constructor({ placesRepository }) {
    super();
    this.placesRepository = placesRepository;
  }

  async execute(placeId) {
    const { SUCCESS, NOT_FOUND, ERROR } = this.outputs;

    try {
      const place = await this.placesRepository.getById(placeId);

      return this.response(SUCCESS, place);
    } catch (error) {
      if (error.message === this.ERRORS.NOT_FOUND) {
        return this.response(NOT_FOUND, error);
      }

      return this.response(ERROR, null, error);
    }
  }
}

GetPlace.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetPlace;
