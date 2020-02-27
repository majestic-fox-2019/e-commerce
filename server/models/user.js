'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  const bcrypt = require('bcrypt');
  class User extends Model{

  }
  User.init({
    name:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Please enter a name"
        },
        notNull:{
          msg:"Please enter a name"
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isEmail:{
          msg:"Please enter a email"
        },
        notNull:{
          msg:"Please enter a email"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        is:{
          args:[/^.{6,}$/],
          msg:"Minimum password length is 6"
        },  
        notEmpty:{
          msg:"Please enter a password"
        },
        notNull:{
          msg:"Please enter a password"
        }
      }
    },
    role: {
      type:DataTypes.STRING,
    },
  }, {
    sequelize,
    hooks:{
      beforeCreate(user,option) {
        return bcrypt
                .hash(user.password, 10)
                .then(hash => {
                  user.password = hash
                })
      },
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Product,{through:models.Cart})
  };
  return User;
};