const { hashPassword } = require('../../helpers/bcrypt');
'use strict';
module.exports = (sequelize, DataTypes) => {
  // const User = sequelize.define('User', {
  //   name: DataTypes.STRING,
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING
  // }, {});
  const { Model } = sequelize.Sequelize;
  class User extends Model { }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate: function (instance) {
        instance.password = hashPassword(instance.password);
      }
    },
    sequelize
  })
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};