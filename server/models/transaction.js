'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Transaction extends Model {}

  Transaction.init({
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    qty: {
      type : DataTypes.INTEGER,
      validate : {
        min : {
          args : 0,
          msg : 'Quantity minimum 1 item'
        }
      }
    },
    total: DataTypes.FLOAT,
    status: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'Status is required!'
        }
      }
    }
  }, { sequelize })

  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};