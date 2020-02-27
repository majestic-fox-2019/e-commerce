'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Mall extends Model {}
  Mall.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Name is required'
          }
        }
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Category is required'
          }
        }
      },
      imageUrl: DataTypes.STRING,
      price: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Price is required'
          }
        }
      },
      stock: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Stock is required'
          }
        }
      }
    },
    { sequelize }
  )
  Mall.associate = function(models) {
    Mall.hasMany(models.ChartMall)
  }
  return Mall
}
