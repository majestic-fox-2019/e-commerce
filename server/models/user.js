'use strict';

const bcrypt = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize

  class User extends Model {}

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is empty'
        },
        notNull: {
          args: true,
          msg: 'Name is empty'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is empty'
        },
        notNull: {
          args: true,
          msg: 'Email is empty'
        },
        isExist: (value) => {
          return User.count({where: {email : value}})
          .then(count => {
            if (count > 0){
              throw new Error('Email already registered')
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
          msg: 'Password is empty'
        },
        notNull: {
          args: true,
          msg: 'Password is empty'
        },
      }
    },
    role: {
      type: DataTypes.STRING,
    }
  }, {
    hooks:{
      beforeCreate: (instance, options) => {
        instance.password = bcrypt.hashPassword(instance.password)
        if(!instance.role || instance.role == ''){
          instance.role = 'customer'
        }
      }
    },
    sequelize});
    
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Product, {through : "Cart"})
  };
  return User;
};