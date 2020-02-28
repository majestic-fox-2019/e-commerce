'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class Product extends Model{}
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: `Please input product name`
        },
        notNull: {
          args: true,
          msg: 'Please input product name'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: `Please input product category`
        },
        notNull: {
          args: true,
          msg: 'Please input product category'
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
        notEmpty:{
          args: true,
          msg: `Please input product price`
        },
        notNull: {
          args: true,
          msg: 'Please input product price'
        },
        min: {
          args: [1],
          msg: `Price can't lower than 1`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: `Please input product stock`
        },
        notNull: {
          args: true,
          msg: 'Please input product stock'
        }
      }
    } 
  },{sequelize})
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Category)
    Product.belongsToMany(models.User, { through : 'Cart' })
  };
  return Product;
};