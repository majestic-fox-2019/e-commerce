'use strict';
const { hash } = require('../../helpers/helper')
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model { }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user, options) {
        user.password = hash(user.password)
      }
    }, sequelize
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};