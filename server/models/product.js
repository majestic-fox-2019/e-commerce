'use strict';

const convertRupiah = require('../helpers/convertRupiah')

module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize

  class Product extends Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is empty'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description is empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image Url is empty'
        }
      }
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price is empty'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Stock is empty'
        }
      }
    }
  }, {
    hooks: {
      afterFind(instance, options){
        instance.forEach(el => {
          
          el.price = convertRupiah(el.price)
          console.log(el.price)
        })
      }
    },
    sequelize});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.User, {through : "Cart"})
  };
  return Product;
};