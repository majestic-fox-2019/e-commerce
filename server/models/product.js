'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model { }
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "Product's name should not be null" },
        notEmpty: { msg: "Product's name should not be empty" }
      }, allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: { msg: "Stock should be number" },
        notNull: { msg: "Product's stock should not be null" },
        notEmpty: { msg: "Product's stock should not be empty" },
        // min: {
        //   args: 0,
        //   msg: "Stock should not be below 0"
        // }
      }, allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: { msg: "Price should be number" },
        notNull: { msg: "Product's price should not be null" },
        notEmpty: { msg: "Product's price should not be empty" },
        // min: {
        //   args: 0,
        //   msg: "price should not be below 0"
        // }
      }, allowNull: false
    },
    image_url: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    },
    category: {
      type: DataTypes.ENUM(['Clothing', 'Shoes', 'Accessories']),
      defaultValue: "Clothing"
    },
    description: {
      type: DataTypes.STRING
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, { sequelize })

  Product.associate = function (models) {
    // associations can be defined here
    Product.hasMany(models.Review)
    Product.belongsTo(models.User)
    Product.belongsToMany(models.User, { through: models.Cart })

  };
  return Product;
};