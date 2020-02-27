'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Category extends Model { }
  Category.init({
    name: DataTypes.STRING
  }, {sequelize})
  // const Category = sequelize.define('Category', {
  //   name: DataTypes.STRING
  // }, {});
  Category.associate = function (models) {
    Category.hasMany(models.Product)
    // associations can be defined here
    // Category.hasMany(models.Product)
  };
  return Category;
};