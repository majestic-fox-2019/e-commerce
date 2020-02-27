'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Product extends Model { }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product name is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: 'Price must be number'
        },
        notEmpty: {
          msg: 'Price is required'
        }
      }
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Image URL is required'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Stock is required'
        },
        isNumeric: {
          msg: 'Stock must be a number'
        }
      }
    },
    CategoryId: DataTypes.INTEGER
  }, { sequelize });
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsTo(models.Category)
    Product.belongsToMany(models.User, { through: 'Carts' })
  };
  return Product;
};