"use strict";
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
    const { Model } = sequelize.Sequelize;
    class User extends Model {}
    User.init(
        {
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        args: true,
                        message: "name must be filled"
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        args: true,
                        message: "email must be filled"
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        args: true,
                        message: "password must be filled"
                    }
                }
            }
        },
        {
            sequelize,
            hooks: {
                beforeCreate(user, options) {
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(user.password, salt);
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
