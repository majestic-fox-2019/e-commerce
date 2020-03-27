"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Category extends Model {}
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "name must be filled"
          },
          notEmpty: {
            args: true,
            msg: "name must be filled"
          }
        }
      }
    },
    { sequelize }
  );
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Product);
  };
  return Category;
};
