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
        notNull : { msg : "Stock Cannot Empty"},
        notEmpty : { msg: "Stock Cannot Empty"}
      }
    },
    imageurl: DataTypes.STRING,
    description: {
      type: DataTypes.TEXT,
      allowNull : false,
      validate :{
        notNull : { msg : "Desc Cannot Empty"},
        notEmpty : { msg: "Desc Cannot Empty"}
      }

    }
  },{sequelize})


  Product.associate = function(models) {
    Product.hasMany(models.Cart)
    // associations can be defined here
  };
  return Product;
};