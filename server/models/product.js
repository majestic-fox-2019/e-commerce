'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Product extends Model {}
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name is require"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "image is require",
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        notNull:{
          msg: "price is require"
        },
        min: {
          args: 10000,
          msg: "price must be more than 10000"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull: {
          msg: "stock is require"
        },
        min: {
          args: 1,
          msg: "stock must be more than 0"
        }
      }
    }
  }, { sequelize });
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.Cart)
  };
  return Product;
};