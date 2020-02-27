'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Category extends Model { }

  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please enter category name"
        },
        notNull: {
          msg: "Please enter category name"
        }
      }
    },
    image: DataTypes.STRING
  }, { sequelize })

  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.Product)
  };
  return Category;
};