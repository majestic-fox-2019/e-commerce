'use strict';
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name should not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'Name should not be empty!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email should not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'Email should not be empty!'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email format!'
        },
        unique: function (email, next) {
          return User
            .findOne({
              where: {
                email: email
              }
            })
            .then(result => {
              if (result) {
                throw 'Email address already exist!'
              } else {
                next()
              }
            })
            .catch(err => {
              next(err)
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

        notNull: {
          args: true,
          msg: 'Password should not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'Password should not be empty!'
        },
        len: {
          args: [6, 100],
          msg: 'Password must be between 6-100 character!'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, option) => {
        let hash = bcrypt.hashSync(user.password, 10)
        user.password = hash
        user.role = 'user'
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Product, { through: 'UserProduct' })
  };
  return User;
};