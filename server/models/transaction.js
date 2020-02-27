'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize
  const { Product } = sequelize.models

  class Transaction extends Model {}

  Transaction.init({
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    qty: {
      type : DataTypes.INTEGER,
      validate : {
        min : 0
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
  }, { hooks: {
    beforeCreate: (instance, options) => {
      console.log('masuk')
      return Product
        .findByPk(instance.ProductId)
        .then(product => {
          instance.total = instance.qty * product.price
        })
    }
  },
  sequelize })

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User)
    Transaction.belongsTo(models.Product)
  };
  return Transaction;
};