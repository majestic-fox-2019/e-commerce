'use strict';
module.exports = (sequelize, DataTypes) => {
const { Model } = sequelize.Sequelize

class Income extends Model {}

Income.init({
  UserId: {
    type: DataTypes.INTEGER
  },
  ProductId: {
    type: DataTypes.INTEGER
  },
  buyer: {
    type: DataTypes.INTEGER
  },
  qty: {
    type: DataTypes.INTEGER
  },
  finish_date: {
    type: DataTypes.DATE
  },
  official: {
    type: DataTypes.BOOLEAN
  }
},{
  sequelize
})
  Income.associate = function(models) {
    // associations can be defined here
    Income.belongsTo(models.User)
    Income.belongsTo(models.Product)
    // Income.hasMany(models.Product)
  };
  return Income;
};