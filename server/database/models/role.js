'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Role extends Model { }

  Role.init({
    name: DataTypes.STRING
  }, { sequelize });
  Role.associate = function (models) {
    // associations can be defined here
    Role.hasMany(models.User)
  };
  return Role;
};