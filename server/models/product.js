'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model{}
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "product name must be filled"},
        notEmpty: {msg: "product name must be filled"}
      }, allowNull: false
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: {msg: "product price must be filled"},
        notEmpty: {msg: "product price must be filled"}
      }, allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: {msg: "product stock must be filled"},
        notEmpty: {msg: "product stock must be filled"}
      }, allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "category product must be filled"},
        notEmpty: {msg: "category product must be filled"}
      }, allowNull: false
    }
  }, {sequelize})

  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.User, {through: models.Cart})
  };
  return Product;
};