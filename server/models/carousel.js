'use strict';
module.exports = (sequelize, DataTypes) => {
  const Carousel = sequelize.define('Carousel', {
    imageUrl: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Carousel.associate = function(models) {
    // associations can be defined here
  };
  return Carousel;
};