'use strict';
const bcrypt = require('bcrypt')
const saltRound = 6
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model{}
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "name must be filled"},
        notEmpty: {msg: "name must be filled"}
      }, allowNull : false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "email must be filled"},
        notEmpty: {msg: "email must be filled"},
        isEmail: {msg: "email format is wrong"},
        isUnique(value) {
          if (User.dataValues){
            return User.findOne({where:{email:value}})
              .then(user => {
                if(user.dataValues) {
                  throw new Error("email already registered")
                }
              })
          }
        }
      }, allowNull : false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "password must be filled"},
        notEmpty: {msg: "password must be filled"}
      }, allowNull : false
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "address must be filled"},
        notEmpty: {msg: "address must be filled"}
      }, allowNull : false
    },
    phone_number: {
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "phone number must be filled"},
        notEmpty: {msg: "phone number must be filled"},
        isNumeric: {msg: "please fill with the right phone number"}
      }, allowNull : false
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['admin', "consument"]],
          msg: "invalid role user"
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, saltRound)
      }
    }
  })
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Product, {through: models.Cart})
    // User.hasMany(models.Cart)
  };
  return User;
};