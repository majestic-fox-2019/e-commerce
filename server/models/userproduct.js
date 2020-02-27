"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class UserProduct extends Model {}

  UserProduct.init(
    {
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER
    },
    { sequelize }
  );

  UserProduct.associate = function(models) {
    // associations can be defined here
    UserProduct.belongsTo(models.Product)
    UserProduct.belongsTo(models.User)
  };
  return UserProduct;
};
