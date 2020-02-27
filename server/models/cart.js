'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Cart extends Model{

  }

  Cart.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    qty: DataTypes.NUMBER,
    totalPrice: DataTypes.INTEGER,
    checked: DataTypes.INTEGER
  }, {sequelize});
  Cart.associate = function(models) {
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};