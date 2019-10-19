'use strict';

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING
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

  return User;
};
