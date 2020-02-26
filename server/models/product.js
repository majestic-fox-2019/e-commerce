'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Product extends Model {}

  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
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
    Product.belongsToMany(models.User, { through : models.Cart })
  };

  return Product;
};