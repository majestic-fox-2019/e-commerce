'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Cart extends Model{}
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    total: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: {msg: "please filled quantity first"},
        notEmpty: {msg: "please filled quantity first"}
      }, allowNull: false
    }
  }, {sequelize})

  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};