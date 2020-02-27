'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    ProductId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {});
  ProductCategory.associate = function(models) {
    // associations can be defined here
    // ProductCategory.hasMany(models.Product);
    // ProductCategory.hasMany(models.Category);
    ProductCategory.belongsTo(models.Product);
    ProductCategory.belongsTo(models.Category);
  };
  return ProductCategory;
};