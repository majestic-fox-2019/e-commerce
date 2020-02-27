"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class User extends Model { }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "email cannot be null."
          },
          notEmpty: {
            args: true,
            msg: "email cannot be empty."
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password cannot be null"
          },
          notEmpty: {
            args: true,
            msg: "Password cannot be empty."
          }
        }
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password cannot be null"
          },
        }
      },
    }, { sequelize }
  );

  User.associate = function (models) {
    // associations can be defined here
    // User.belongsTo(models.Product)
    User.hasMany(models.UserProduct)
    // User.belongsToMany(models.Product, { through: "UserProduct" });
  };
  return User;
};
