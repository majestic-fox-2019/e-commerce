'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Cart extends Model {}
  Cart.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'UserId is required'
          }
        }
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'ProductId is required'
          }
        }
      },
      confirm: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Confirm is required'
          }
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Quantity is required'
          },
          min: {
            args: 1,
            msg: 'Quantity min. 1 unit'
          }
        }
      }
    },
    { sequelize }
  )
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  }
  return Cart
}
