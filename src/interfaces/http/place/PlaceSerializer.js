const PlaceSerializer = {
  serialize({ id, name, latitude, longitude }) {
    return {
      id,
      name,
      latitude,
      longitude
    };
  }
};

module.exports = PlaceSerializer;
