const Place = require('src/domain/place/Place');

const SequelizePlaceMapper = {
  toEntity({ dataValues }) {
    const { id, name, latitude, longitude } = dataValues;

    return new Place({ id, name, latitude, longitude });
  },

  toDatabase(survivor) {
    const { name, latitude, longitude } = survivor;

    return { name, latitude, longitude };
  }
};

module.exports = SequelizePlaceMapper;
