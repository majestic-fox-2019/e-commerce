'use strict';

const { generateHash } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name is required'
        },
        nameRequired(value) {
          if(!value) {
            throw new Error('Name is required.')
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email is required'
        },
        emailRequired(value) {
          if(!value) {
            throw new Error('Email is required.')
          }
        },
        isEmail: {
          args: true,
          msg: 'Use a valid email format'
        },
        isUnique(value) {
          return User.findOne({
            where: {
              email: value
            }
          })
          .then(user => {
            if(user) {
              throw new Error('Email must unique')
            }
          })
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Phone is required'
        },
        phoneRequired(value) {
          if(!value) {
            throw new Error('Phone is required.')
          }
        },
        isLength(value) {
          if(value) {
            if(value.length < 5 || value.length > 14) {
              throw new Error('Phone length between 5-14')
            }
          }
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Address is required'
        },
        addressRequired(value) {
          if(!value) {
            throw new Error('Address is required.')
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password is required'
        },
        passRequired(value) {
          if(!value) {
            throw new Error('Password is required.')
          }
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = generateHash(user.password)
      }
    },
    sequelize
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Cart)
    User.hasMany(models.Transaction)
  };
  return User;
};