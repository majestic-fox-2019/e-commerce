'use strict';
const encryptPassword = require('../helpers/generatePassword')

module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class User extends Model{}
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true,
        }
      },
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true,
        }
      },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true,
        isEmail: true,
        }
      },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true,
        }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
  },{hooks:{
    beforeCreate(user, options){
      user.password = encryptPassword(user.password)
    }
  }, sequelize})
  // const User = sequelize.define('User', {

  // }, {});
  User.associate = function(models) {
    // associations can be defined here
    // User.hasMany(models.Product)
    User.belongsToMany(models.Product, {through: 'Transaction'})
  };
  return User;
};