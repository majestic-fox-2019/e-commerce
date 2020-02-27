'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize;
  class Love extends Model {}

  Love.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize
  })

  Love.associate = function(models) {
    // associations can be defined here
    Love.belongsTo(models.Product, {foreignKey: 'ProductId', sourceKey: 'id'})
  };
  return Love;
};