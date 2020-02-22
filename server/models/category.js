'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize
  class Category extends Model { }

  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name should not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'Name should not be empty!'
        }
      }
    }
  }, { sequelize })

  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.Product)
  };
  return Category;
};