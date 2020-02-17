'use strict';
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name should not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'Name should not be empty!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: {
          args: true,
          msg: 'Email should not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'Email should not be empty!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password should not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'Password should not be empty!'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, option) => {
        let hash = bcrypt.hashSync(user.password, 10)
        user.password = hash
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};