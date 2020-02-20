'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize 
  class Product extends Model{}

  Product.init({
    name:{
      type:DataTypes.STRING,
      allowNull : false,
      validate :{
        notNull : { msg: "Product Name Cannot Empty"},
        notEmpty: {msg: "Product Name Cannot Empty"}
      }

    },
    price: {
      type:DataTypes.INTEGER,
      allowNull : false,
      validate :{
        notNull : { msg: "Price Cannot Empty"},
        notEmpty: {msg: "Price Cannot Empty"}
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull : false,
      validate :{
        notNull : { msg : "stock at least 1"},
        notEmpty : { msg: "stock at least 1"}
      }

    },
    imageurl: DataTypes.STRING,
  },{sequelize})


  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};