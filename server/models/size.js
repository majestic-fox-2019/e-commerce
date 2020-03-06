'use strict';
module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define('Size', {
    name: DataTypes.STRING
  }, {});
  Size.associate = function(models) {
    // associations can be defined here
  };
  return Size;
};