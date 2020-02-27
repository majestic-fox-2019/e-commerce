'use strict';
const { hash } = require('../../helpers/helper')
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model { }
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 16],
          msg: 'Password must be at least 8 characters long'
        }
      }
    },
    RoleId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(user, options) {
        user.password = hash(user.password)
      }
    }, sequelize
  });
  User.associate = function (models) {
    // associations can be defined here
    User.belongsTo(models.Role)
    User.belongsToMany(models.Product, { through: 'Carts' })
  };
  return User;
};