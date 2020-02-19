'use strict';
const hash = require("../helpers/hashPassword")
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: "Email is invalid" },
        isUnique(value) {
          return User.findAll({ where: { email: value } })
            .then(userFound => {
              if (userFound.length > 0) {
                throw new Error(`email ${value} is already registered`)
              }
            })
        },
        notNull: { msg: "email is required" },
        notEmpty: { msg: "email should not be empty" }
      }, allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "username is required" },
        notEmpty: { msg: "username should not be empty" }
      }, allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "password should not be empty" },
        notNull: { msg: "password is required" },
        min: {
          args: 6,
          msg: "minimal character for password is 6"
        }
      }, allowNull: false
    },
    role: {
      type: DataTypes.ENUM(['admin', 'user']),
      defaultValue: "user",
      validate: {
        notEmpty: { msg: "role should not be empty" },
        notNull: { msg: "role is required" }
      }, allowNull: false
    }
  }, {
      hooks: {
        beforeCreate: (instance, options) => {
          let hashed = hash(instance.password)
          instance.password = hashed
        }
      }, sequelize
    })
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Product, { through: models.Cart })
    User.hasMany(models.Review)
    User.hasMany(models.Product)
  };
  return User;
};