'use strict';
module.exports = (sequelize, DataTypes) => {

  const bcrypt = require('bcryptjs');
  const salt = bcrypt.genSaltSync(10);
  

  const { Model } = sequelize.Sequelize
  
  class User extends Model {}

 
  User.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "name cannot be empty" },
        notEmpty: { msg: "name cannot be empty" }
      }
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {msg : "please insert correct email"},
        notNull: { msg: "email cannot be empty" },
        notEmpty: { msg: "email cannot be empty" }
      }
    }, 
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "password cannot be empty" },
        notEmpty: { msg: "password cannot be empty" }
      }
    },
    role : {
      type : DataTypes.STRING
    }
  },{
    sequelize,
    hooks:{
      beforeCreate: (instance,options)=>{
        const hash = bcrypt.hashSync(instance.password,salt);
        instance.password = hash
        instance.role = "user"
      }
    }
    })


  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};