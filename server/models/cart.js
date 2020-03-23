'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Cart extends Model { }
  Cart.init({
    status: {
      type: DataTypes.ENUM(['paid', 'unpaid']),
      defaultValue: 'unpaid'
    },
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    qty: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: { msg: "Price should be number" },
        notNull: { msg: "qty's should not be null" },
        notEmpty: { msg: "qty's should not be empty" }
      }, allowNull: false
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: { msg: "Price should be number" },
        notNull: { msg: "Cart's price should not be null" },
        notEmpty: { msg: "Cart's price should not be empty" }
      }, allowNull: false
    }
  }, { sequelize })

  Cart.associate = function (models) {
    // associations can be defined here
    Cart.belongsTo(models.Product, { sourceKey: 'id', foreignKey: "ProductId" })
    Cart.belongsTo(models.User, { sourceKey: 'id', foreignKey: "UserId" })

  };
  return Cart;
};