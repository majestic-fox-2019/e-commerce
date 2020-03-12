'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Size extends Model{}
  Size.init({
    name: DataTypes.STRING
  }, { sequelize });
  Size.associate = function(models) {
    // associations can be defined here
    Size.belongsTo(models.Product, { foreignKey: 'SizeId'})
  };
  return Size;
};