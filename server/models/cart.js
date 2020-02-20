'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Cart extends Model { }
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (order) => {
        order.status = 'in cart'
      }
    },
    sequelize
  });
  Cart.associate = function (models) {
    // associations can be defined here
  };
  return Cart;
};