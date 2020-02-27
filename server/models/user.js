'use strict';

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model { }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please enter name"
        },
        notNull: {
          msg: "Please enter name"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please enter valid email address"
        },
        notNull: {
          msg: "Please enter valid email address"
        },
        isEmail: {
          msg: "Please enter valid email address"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 32],
          msg: 'Password length must be between 6 - 32 characters'
        },
        notEmpty: {
          msg: "Please enter password"
        },
        notNull: {
          msg: "Please enter password"
        },
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize, hooks: {
      beforeCreate(user, options) {
        user.password = bcrypt.hashSync(user.password, 10);
      }
    }
  })

  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Product, { through: models.Cart })
    User.hasMany(models.Cart)
    User.hasMany(models.History)
  };
  return User;
};