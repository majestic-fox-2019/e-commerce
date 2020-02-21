"use strict";
let bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class User extends Model {}
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "email must be filled"
          },
          notEmpty: {
            args: true,
            msg: "email must be filled"
          }
        }
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "password must be filled"
          },
          notEmpty: {
            args: true,
            msg: "password must be filled"
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "password must be filled"
          },
          notEmpty: {
            args: true,
            msg: "password must be filled"
          }
        }
      },
      role: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      hooks: {
        beforeCreate: function(user, options) {
          let hash = bcrypt.hashSync(user.password, 10);
          user.password = hash;
        }
      }
    }
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
