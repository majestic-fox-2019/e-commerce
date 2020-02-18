'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Product extends Model {}

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Name is required'
          }
        }
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: 1,
            msg: 'Price minimum value is 1'
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: 5,
            msg: 'Description min. 6 characters'
          },
          notEmpty: {
            msg: 'Description is required'
          }
        }
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: 1,
            msg: 'Stock minimum value is 1'
          }
        }
      },
      category: {
        type: DataTypes.ENUM,
        values: ['Desktop', 'Laptop', 'Keyboard', 'Monitor', 'Mouse']
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Image URL is required'
          }
        }
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'UserId is required'
          }
        }
      }
    },
    { sequelize }
  )
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User)
    Product.hasMany(models.Transaction)
    Product.hasMany(models.Cart)
  }
  return Product
}
