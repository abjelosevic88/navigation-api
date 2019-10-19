'use strict';

const dataFaker = require('src/infra/support/dataFaker');

module.exports = {
  up: function (queryInterface) {
    const testPlaces = [];

    for(let i = 0; i < 100; i++) {
      testPlaces.push({
        name: dataFaker.name(),
        latitude: dataFaker.latitude(),
        longitude: dataFaker.longitude(),
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    return queryInterface.bulkInsert('places', testPlaces, {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('places', null, {});
  }
};
