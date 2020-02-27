'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Category extends Model {}

  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name must be filled"
        },
        notNull: {
          args: true,
          msg: "Please enter category name"
        }
      }
    }
  },
  {
    hooks: {
      beforeCreate: (category, option) => {
        category.name = category.name.toLowerCase()
      },
      beforeUpdate: (category, option) => {
        category.name = category.name.toLowerCase()
      },
    },
    sequelize
  })


  Category.associate = function(models) {
    Category.hasMany(models.Product)
  };

  return Category;
};