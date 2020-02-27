'use strict';
const {hasher} = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize

  class User extends Model {

  }

  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : 'email is required'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : 'password is required'
        }
      }
    },
    role : {
      type : DataTypes.STRING
    }
  }, {
    hooks : {
      beforeCreate : (instance, options) => {
        instance.password = hasher(instance.password)
      }
  },
  sequelize});
  User.associate = function(models) {
    User.belongsToMany(models.Product, {through : 'Cart'})
  };
  return User;
};