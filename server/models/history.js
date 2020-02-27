'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    email: DataTypes.STRING,
    items: DataTypes.JSON,
    totalquantity: DataTypes.INTEGER,
    totalprice: DataTypes.INTEGER
  }, {});
  History.associate = function(models) {
    // associations can be defined here
  };
  return History;
};