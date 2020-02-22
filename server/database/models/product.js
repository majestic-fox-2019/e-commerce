'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Product extends Model { }

  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    img_url: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, { sequelize });
  Product.associate = function (models) {
    // associations can be defined here
  };
  return Product;
};