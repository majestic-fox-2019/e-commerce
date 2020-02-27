'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Product = sequelize.define('Product', {
  //   name: DataTypes.STRING,
  //   image_url: DataTypes.STRING,
  //   price: DataTypes.INTEGER,
  //   stock: DataTypes.INTEGER
  // }, {});
  const { Model } = sequelize.Sequelize;
  class Product extends Model { };
  Product.init({
    name: {
      type: DataTypes.STRING
    },
    image_url: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    },
    stock: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize
  })
  Product.associate = function (models) {
    // associations can be defined here
    // Product.belongsTo(models.ProductCategory);
    // Product.hasMany(models.Category, { through: models.ProductCategory });
    Product.belongsToMany(models.Category, { through: models.ProductCategory });
    Product.belongsToMany(models.User, { through: models.Cart });
    Product.hasMany(models.TransactionDetail);
  };
  return Product;
};