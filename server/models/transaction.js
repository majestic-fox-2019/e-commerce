'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class Transaction extends Model{}
  Transaction.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
        min: 1,
      },
    }
  },{sequelize})
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.User)
    Transaction.belongsTo(models.Product)
  };
  return Transaction;
};