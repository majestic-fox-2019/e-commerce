'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model { }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'name is required' }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'image is required' }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'price is required' },
        min: 0
      }
    },
    stock: {
      type: DataTypes.INTEGER,

      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'name is required' },
        min: 0
      }
    },
    category: {
      type: DataTypes.STRING
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize
  });
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsTo(models.User)
  };
  return Product;
};