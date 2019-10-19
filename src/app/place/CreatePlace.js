const Operation = require('src/app/Operation');
const Place = require('src/domain/place/Place');

class CreatePlace extends Operation {
  constructor({ placesRepository }) {
    super();
    this.placesRepository = placesRepository;
  }

  async execute(placeData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    const place = new Place(placeData);

    try {
      const newPlace = await this.placesRepository.add(place);

      return this.response(SUCCESS, newPlace);
    } catch (error) {
      if(error.message === this.ERRORS.VALIDATION) {
        return this.response(VALIDATION_ERROR, error);
      }

      return this.response(ERROR, null, error);
    }
  }
}

CreatePlace.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreatePlace;
