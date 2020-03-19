'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  const {hash} = require("../helpers")
  class User extends Model {}

  User.init({
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "fullname is require"
        },
        len: {
          args: 3,
          msg: "min 3 character"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "email is require"
        },
        isEmailAlready(value, next) {
          User.findOne({
            where: {
              email: value
            }
          })
          .then(result => {
            if(result){
              return next({status:404, message:'email has already take'})
            }
            next()
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "password is require"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "role is require"
        },
        isIn: {
          args: [['admin', 'user']],
          msg: "role must be admin or user"
        }
      }
    }
  }, { 
    hooks:{
      beforeCreate:(user, options) => {
        const hashingPass = hash(user.password)
        user.password = hashingPass 
      }
  }, sequelize });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Cart)
  };
  return User;
};