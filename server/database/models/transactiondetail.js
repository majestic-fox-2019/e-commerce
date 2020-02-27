'use strict';
module.exports = (sequelize, DataTypes) => {
  const TransactionDetail = sequelize.define('TransactionDetail', {
    TransactionId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  TransactionDetail.associate = function(models) {
    // associations can be defined here
    TransactionDetail.belongsTo(models.Transaction);
    TransactionDetail.belongsTo(models.Product);
  };
  return TransactionDetail;
};