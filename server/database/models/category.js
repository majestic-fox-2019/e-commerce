'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Category = sequelize.define('Category', {
  //   name: DataTypes.STRING
  // }, {});
  const { Model } = sequelize.Sequelize;
  class Category extends Model { };
  Category.init({
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize
  })
  Category.associate = function (models) {
    // associations can be defined here
    // Category.belongsTo(models.ProductCategory);
    // Category.hasMany(models.Product, { through: models.ProductCategory });
    Category.belongsToMany(models.Product, { through: models.ProductCategory });
  };
  return Category;
};