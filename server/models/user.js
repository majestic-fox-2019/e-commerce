'use strict'
const { hashPass } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Email is required' },
          notNull: { msg: 'Email is required' }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: 'Wrong email format' },
          notEmpty: { msg: 'Email is required' },
          notNull: { msg: 'Email is required' },
          isUnique(val) {
            return User.findOne({ where: { email: val } }).then(result => {
              if (result) {
                throw { code: 400, msg: 'Email already used' }
              }
            })
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Email is required' },
          notNull: { msg: 'Email is required' }
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^(^\+62\s?|^0)(\d{3,4}){2}\d{3,4}$/g,
            msg: 'Must contain at least 11 digit'
          },
          notEmpty: { msg: 'Email is required' },
          notNull: { msg: 'Email is required' }
        }
      },
      userLocation: {
        type: DataTypes.STRING
      },
      userLocationId: {
        type: DataTypes.INTEGER
      },
      role: DataTypes.STRING,
      shop_name: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate(instance) {
          const hash = hashPass(instance.password)
          instance.password = hash
        }
      }
    }
  )
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Product)
    User.hasMany(models.Income)
    User.belongsToMany(models.Product, { through: models.Cart })
  }
  return User
}
