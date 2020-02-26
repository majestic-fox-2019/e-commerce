'use strict';
module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize

  class Cart extends Model {}

  Cart.init({
    UserId: {
      type: DataTypes.INTEGER
    },
    ProductId: {
      type: DataTypes.INTEGER
    },
    total: {
      type: DataTypes.INTEGER
    },
    amount: {
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Amount is empty'
          },
          notNull: {
            args: true,
            msg: 'Amount is required'
          }
        }
      }
    }
  }, {sequelize});
  Cart.associate = function(models) {
    // associations can be defined here
  };
  return Cart;
};