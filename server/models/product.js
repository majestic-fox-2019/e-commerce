'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class Product extends Model{}
  Product.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true,

      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,

      }
    },
    image_url: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true,

      }},
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:true,
        isInt: true,
        min: 0,
      }},
    stock: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:true,
        isInt: true,
        min: 0,
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  }, {sequelize})
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Category)
    Product.hasMany(models.Transaction)
    // Product.belongsToMany(models.User, { through: 'Transaction' })

  };
  return Product;
};