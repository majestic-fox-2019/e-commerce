'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize;
  class Product extends Model{}

  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Product\'s name cannot be empty!'
        }
      }
    },
    image_url: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize
  })

  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};