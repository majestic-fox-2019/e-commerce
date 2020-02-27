'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize;

  class Bookmark extends Model {}

  Bookmark.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize
  });

  Bookmark.associate = function(models) {
    // associations can be defined here
    Bookmark.belongsTo(models.Product, {foreignKey: 'ProductId', sourceKey: 'id'})
  };
  return Bookmark;
};