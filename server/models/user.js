'use strict';
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'Name is required!'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          msg : 'Email format is incorrect!'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'Password is required!'
        }
      }
    },
    roles: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'Roles is required'
        }
      }
    }
  }, { hooks : {
    beforeCreate : (instance, options) => {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(instance.password, salt)

      instance.password = hash
    }
  },sequelize })

  User.associate = function(models) {
    User.hasMany(models.Transaction)
  };
  return User;
};