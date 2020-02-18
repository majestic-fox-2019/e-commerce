'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Purchase extends Model{}

  Purchase.init({
    UserId: {
      type: DataTypes.INTEGER
    },
    ProductId: {
      type: DataTypes.INTEGER
    },
    qty: {
      type: DataTypes.INTEGER
    },
    finish_date: {
      type: DataTypes.DATE
    }
  },{
    sequelize
  })

  Purchase.associate = function(models) {
    // associations can be defined here
    Purchase.belongsTo(models.User)
    Purchase.belongsTo(models.Product)
  };
  return Purchase;
};