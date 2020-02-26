'use strict';
module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize

  class Transaction extends Model {}

  Transaction.init({
    products: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.STRING,
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    hooks: {
      beforeCreate(instance, options){
        instance.status = false
      }
    },
    sequelize});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User)
  };
  return Transaction;
};