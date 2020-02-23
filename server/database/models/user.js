'use strict';
const { hashPassword } = require('../../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  // const User = sequelize.define('User', {
  //   name: DataTypes.STRING,
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING,
  //   image_url: DataTypes.STRING,
  //   role: DataTypes.STRING
  // }, {});
  const { Model } = sequelize.Sequelize;
  class User extends Model { };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email is invalid!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 32],
          msg: "Password must be between 6 and 32 characters!"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      defaultValue: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "customer"
    }
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.password = hashPassword(instance.password);
      }
    },
    sequelize
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};