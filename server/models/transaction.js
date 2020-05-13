'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Transaction extends Model { }
  Transaction.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill quantity"
        }
      }
    },
    subTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill subtotal"
        }
      }
    }
  }, {
    sequelize
  });
  Transaction.associate = function (models) {
    // associations can be defined here
    Transaction.belongsTo(models.User)
    Transaction.belongsTo(models.Product)
  };
  return Transaction;
};