'use strict';
const { hashPassword } = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill username"
        },
        notNull: {
          msg: "please enter your username"
        },
        isUnique(value) {
          return User.findOne({
            where: {
              username: value
            }
          })
            .then((result) => {
              if (result) {
                throw new Error("username already exist")
              }
            })
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill email"
        },
        notNull: {
          msg: "please enter your email"
        },
        isEmail: {
          args: true,
          msg: "format email wrong"
        },
        isUnique(value) {
          return User.findOne({
            where: {
              email: value
            }
          })
            .then((result) => {
              if (result) {
                throw new Error("Email address already exist")
              }
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill password"
        },
        len: {
          args: [6, 999999],
          msg: "minimal password 6"
        },
        notNull: {
          msg: "please enter your password"
        }
      }
    },
    role: { type: DataTypes.STRING }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
      }
    },
    sequelize
  });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Product)
    User.belongsToMany(models.Product, { through: models.Cart })
  };
  return User;
};