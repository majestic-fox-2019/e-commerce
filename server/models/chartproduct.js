'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class ChartProduct extends Model {}
  ChartProduct.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'User is required'
          }
        }
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Product is required'
          }
        }
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Status is required'
          }
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Quantity is required'
          }
        }
      }
    },
    { sequelize }
  )
  ChartProduct.associate = function(models) {
    // associations can be defined here
    ChartProduct.belongsTo(models.Product)
    ChartProduct.belongsTo(models.User)
  }
  return ChartProduct
}
