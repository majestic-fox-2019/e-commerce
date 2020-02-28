'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class Category extends Model{}
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: `Please input category name`
        },
        notNull: {
          args: true,
          msg: 'Please input category name'
        }
      }
    },
    addedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: `Please input user email`
        },
        notNull: {
          args: true,
          msg: 'Please input user email'
        }
      }
    }
  },{sequelize})
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Product)
  };
  return Category;
};