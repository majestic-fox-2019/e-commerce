'use strict'
module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define(
    'Income',
    {
      UserId: DataTypes.INTEGER,
      CartId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER
    },
    {}
  )
  Income.associate = function(models) {
    // associations can be defined here
    Income.belongsTo(models.User)
    Income.belongsTo(models.Cart)
    Income.belongsTo(models.Product)
  }
  return Income
}
