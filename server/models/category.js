'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Category extends Model{}
  Category.init({
    name: DataTypes.STRING
  }, { sequelize });
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsTo(models.Product, {foreignKey: 'CategoryId'})
  };
  return Category;
};