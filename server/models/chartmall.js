'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class ChartMall extends Model {}
  ChartMall.init(
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
      MallId: {
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
  ChartMall.associate = function(models) {
    // associations can be defined here
    ChartMall.belongsTo(models.Product)
    ChartMall.belongsTo(models.User)
  }
  return ChartMall
}
