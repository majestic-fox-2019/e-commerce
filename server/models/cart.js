'use strict'
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    'Cart',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      price: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        validate: { isIn: [['check', 'unpaid', 'paid']] }
      }
    },
    {}
  )
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.hasMany(models.Income)
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  }
  return Cart
}
