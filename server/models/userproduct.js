'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class UserProduct extends Model { }

  UserProduct.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, { sequelize })

  UserProduct.associate = function (models) {
    // associations can be defined here
  };
  return UserProduct;
};