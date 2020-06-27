'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class User extends Model {}
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Username is required'
          },
          len: {
            args: 5,
            msg: 'Username min. 6 characters length'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Email is required'
          },
          isEmail: {
            msg: 'Wrong email format'
          }
        }
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Phone number is required'
          },
          len: {
            args: 10,
            msg: 'Phone number min. 11 characters length'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Password is required'
          },
          len: {
            args: 5,
            msg: 'Password min. 6 characters length'
          }
        }
      },
      platform: {
        type: DataTypes.ENUM,
        values: ['google, normal'],
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Username is required'
          }
        }
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      hooks: {
        beforeCreate: (instance) => {
          const hash = require('../helpers/hash')
          instance.password = hash(instance.password)
        },
        beforeBulkCreate: (instance) => {
          const hash = require('../helpers/hash')
          instance.password = hash(instance.password)
        }
      },
      sequelize
    }
  )

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Product)
    User.hasMany(models.Transaction)
  }
  return User
}
