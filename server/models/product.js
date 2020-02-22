'use strict';
module.exports = (sequelize, DataTypes) => {

  const  { Model } = sequelize.Sequelize

  class Product extends Model {}

  Product.init({
    name : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'Product name is required!',
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type : DataTypes.INTEGER,
      validate : {
        isNumeric : {
          msg : 'Price must be a number!'
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        isNumeric : {
          msg : 'Stock must be a number!'
        }
      }
    },
    CategoryId: {
      type : DataTypes.INTEGER,
      validate : {
        notEmpty : {
          msg : 'Category is required!'
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'Description is required!'
        }
      }
    },
    status_product : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'Status product is required!'
        }
      }
    }
  }, { sequelize })

  Product.associate = function(models) {
    Product.hasMany(models.Transaction)
    Product.belongsTo(models.Category)
  };
  return Product;
};