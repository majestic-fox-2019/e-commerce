'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Cart = sequelize.define('Cart', {
  //   UserId: DataTypes.INTEGER,
  //   ProductId: DataTypes.INTEGER,
  //   quantity: DataTypes.INTEGER
  // }, {});
  const { Model } = sequelize.Sequelize;
  class Cart extends Model { };
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize
  });
  Cart.associate = function (models) {
    // associations can be defined here
    Cart.belongsTo(models.User);
    Cart.belongsTo(models.Product);
  };
  return Cart;
};