'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Cart extends Model{}
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {sequelize})

  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};