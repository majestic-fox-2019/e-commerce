'use strict';
const {hashing} = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class User extends Model{}
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty:{
            args: true,
            msg: `Please input username`
          },
          notNull: {
            args: true,
            msg: 'Please input username'
          }
        }
    },
    role: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: `must using email format`
        },
        notEmpty:{
          args: true,
          msg: `Please input username`
        },
        notNull: {
          args: true,
          msg: 'Please input username'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: `Please input password`
        },
        notNull: {
          args: true,
          msg: 'Please input password'
        },
        below8(string) {
          if(string.length < 8) {
            throw new Error('Password length min 8');
          }
        }
      }
    } 
  },{sequelize,hooks:{
    beforeCreate: (user, options)=>{
      user.password = hashing(user.password)
    }
  }})
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Product, { through : 'Cart' })
  };
  return User;
};