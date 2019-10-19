'use strict';

module.exports = function(sequelize, DataTypes) {
  const Place = sequelize.define('place', {
    name: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      }
    },
    underscored: true,
    timestamps: true
  });

  return Place;
};
