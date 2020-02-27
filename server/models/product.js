'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  
  class Product extends Model {

  }

  Product.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : 'Product name is required'
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : 'Price is required'
        },
        min : {
          args : -1,
          msg : "Price can't be minus"
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : 'Stock is required'
        },
        min : {
          args : 1,
          msg : "Stock can't be less than 1"
        }
      }
    },
    category: DataTypes.STRING
  }, {sequelize});

  Product.associate = function(models) {
    Product.belongsToMany(models.User, {through : 'Cart'})
  };
  return Product;
};