'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize;
  class Transaction extends Model {}

  Transaction.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    isSettled: DataTypes.BOOLEAN
  }, {
    sequelize
  })

  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.User, {foreignKey: 'UserId', sourceKey: 'id'})
    Transaction.belongsTo(models.Product, {foreignKey: 'ProductId', sourceKey: 'id'})
  };
  return Transaction;
};