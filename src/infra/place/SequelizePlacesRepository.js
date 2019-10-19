const PlaceMapper = require('./SequelizePlaceMapper');
const { ERRORS } = require('src/interfaces/http/utils/consts');

class SequelizePLacesRepository {
  constructor({ PlaceModel }) {
    this.PlaceModel = PlaceModel;
  }

  async getAll(...args) {
    const places = await this.PlaceModel.findAll(...args);

    return places.map(PlaceMapper.toEntity);
  }

  async getById(id) {
    const place = await this._getById(id);

    return PlaceMapper.toEntity(place);
  }

  async add(place) {
    const { valid, errors } = place.validate();

    if (!valid) {
      const error = new Error(ERRORS.VALIDATION);
      error.type = ERRORS.VALIDATION;
      error.details = errors;

      throw error;
    }

    const newPlace = await this.PlaceModel.create(PlaceMapper.toDatabase(place));
    return PlaceMapper.toEntity(newPlace);
  }

  async remove(id) {
    const place = await this._getById(id);

    await place.destroy();
    return;
  }

  async update(id, newData) {
    const place = await this._getById(id);

    const transaction = await this.PlaceModel.sequelize.transaction();

    try {
      const updatedPlace = await place.update(newData, { transaction });
      const placeEntity = PlaceMapper.toEntity(updatedPlace);

      const { valid, errors } = placeEntity.validate();

      if (!valid) {
        const error = new Error(ERRORS.VALIDATION);
        error.type = ERRORS.VALIDATION;
        error.details = errors;

        throw error;
      }

      await transaction.commit();

      return placeEntity;
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.PlaceModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.PlaceModel.findById(id, { rejectOnEmpty: true });
    } catch(error) {
      if(error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error(ERRORS.NOT_FOUND);
        notFoundError.type = ERRORS.NOT_FOUND;
        notFoundError.details = `Place with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = SequelizePLacesRepository;
