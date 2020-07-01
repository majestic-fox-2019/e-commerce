'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Product extends Model { }

  Product.init({
    price: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, { sequelize });

  Product.associate = function (models) {
    // associations can be defined here
    Product.hasMany(models.UserProduct)
    // Product.belongsToMany(models.User, { through: 'UserProduct' })
  };
  return Product;
};