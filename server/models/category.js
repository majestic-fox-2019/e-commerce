'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Category extends Model { }
  Category.init({
    category: DataTypes.STRING
  }, { sequelize })
  Category.associate = function (models) {
    Category.hasMany(models.Product)
  };
  return Category;
}