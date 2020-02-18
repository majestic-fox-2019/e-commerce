'use strict'
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    'Cart',
    {
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      price: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        validate: { isIn: [['paid', 'unpaid']] }
      }
    },
    {}
  )
  Cart.associate = function(models) {
    // associations can be defined here
  }
  return Cart
}
