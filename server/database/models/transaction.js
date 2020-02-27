'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    UserId: DataTypes.INTEGER,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.hasMany(models.TransactionDetail)
  };
  return Transaction;
};