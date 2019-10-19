const { attributes } = require('structure');

const Place = attributes({
  id: Number,
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    require: true
  },
  longitude: {
    type: Number,
    require: true
  }
})(class Place {
  isLegal() {
    return this.age >= Place.MIN_LEGAL_AGE;
  }
});

Place.MIN_LEGAL_AGE = 21;

module.exports = Place;
