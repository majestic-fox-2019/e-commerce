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
          msg: "Please enter product name"
        },
        notNull: {
          msg: "Please enter product name"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: "Product price can't be zero or less"
        },
        notEmpty: {
          msg: "Please enter product price"
        },
        notNull: {
          msg: "Please enter product price"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: "Product stock can't be less than zero"
        },
        notNull: {
          msg: "Please enter product stock"
        }
      }
    },
    CategoryId: DataTypes.INTEGER
  }, { sequelize })

  Product.associate = function (models) {
    Product.belongsTo(models.Category)
  };
  return Product;
};