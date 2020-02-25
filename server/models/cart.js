'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Cart extends Model { }
  Cart.init({
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, { sequelize })
  Cart.associate = function (models) {
  };
  return Cart;
};