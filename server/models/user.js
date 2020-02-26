'use strict';
const errors = require('http-errors')
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class User extends Model { }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'the name column cannot be empty' },
        notEmpty: { args: true, msg: 'the name column cannot be empty' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmailUniq(value) {
          return User.findOne({ where: { email: value } })
            .then(resultEmail => {
              if (resultEmail) {
                throw errors('406', 'Not Acceptable')
              }
            })
        }
      }
    },
    role: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, 10)
      }
    },
    sequelize
  })

  User.associate = function (models) {
    // associations can be defined here
    // User.hasMany(models.Product)
    User.belongsToMany(models.Product, { through: models.Cart })
  };
  return User;
};