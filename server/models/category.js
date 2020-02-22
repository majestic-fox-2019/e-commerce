'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Category extends Model {}

  Category.init({
    category_name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'Category name is required!'
        }
      }
    }
  }, { sequelize })

  Category.associate = function(models) {
    Category.hasMany(models.Product)
  };
  return Category;
};