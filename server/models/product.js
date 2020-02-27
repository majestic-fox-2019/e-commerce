'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Please enter a name"
        },
        notNull:{
          msg:"Please enter a name"
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        min:{
          args:[1],
          msg:"Price can't be zero or less"
        },
        notNull:{
          msg:"Please enter a price"
        },
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        min:{
          args:[0],
          msg:"Stock can't below zero"
        },
        notNull:{
          msg:"Please enter a stock"
        },
      }
    },
    CategoryId: {
      type:DataTypes.INTEGER
    }
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Category)
    Product.belongsToMany(models.User,{through:models.Cart})
  };
  return Product;
};