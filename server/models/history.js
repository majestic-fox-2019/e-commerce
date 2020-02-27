'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    UserId: DataTypes.INTEGER,
    product: DataTypes.JSON,
    totalQty: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {});

  History.associate = function (models) {
    // associations can be defined here
    History.belongsTo(models.User)
  };
  return History;
};