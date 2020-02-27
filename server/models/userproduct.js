'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class UserProduct extends Model { }

  UserProduct.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate: (cart, option) => {
        if (cart.amount == undefined) {
          cart.amount = 1
        }
      }
    }
  })

  UserProduct.associate = function (models) {
    // associations can be defined here
  };
  return UserProduct;
};