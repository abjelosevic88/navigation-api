const Operation = require('src/app/Operation');

class GetAllPlaces extends Operation {
  constructor({ placesRepository }) {
    super();
    this.placesRepository = placesRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const places = await this.placesRepository.getAll({
        attributes: ['id', 'name', 'longitude', 'latitude']
      });

      return this.response(SUCCESS, places);
    } catch(error) {
      return this.response(ERROR, null, error);
    }
  }
}

GetAllPlaces.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllPlaces;
