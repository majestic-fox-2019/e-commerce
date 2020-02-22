'use strict';

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Product extends Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name must be filled"
        },
        notNull: {
          args: true,
          msg: "Please enter your name"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image URL's must be filled"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price must be filled"
        },
        customValidator(value) {
          if (value < 0) {
            throw new Error("Price minimum 0");
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Stock must be filled"
        },
        customValidator(value) {
          if (value < 0) {
            throw new Error("Stock minimum 0");
          }
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER
    },
  },
  {
    sequelize
  })

  Product.associate = function(models) {
    Product.belongsTo(models.Category)
  };

  return Product;
};