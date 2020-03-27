"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Cart extends Model {}
  Cart.init(
    {
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "total must be filled"
          },
          notEmpty: {
            args: true,
            msg: "total must be filled"
          }
        }
      }
    },
    { sequelize }
  );

  Cart.associate = function(models) {
    // associations can be defined here
  };
  return Cart;
};
