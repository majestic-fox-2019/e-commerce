'use strict';
module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define('Income', {
    UserId: DataTypes.INTEGER,
    CartId: DataTypes.INTEGER
  }, {});
  Income.associate = function(models) {
    // associations can be defined here
  };
  return Income;
};