"use strict";
module.exports = (sequelize, DataTypes) => {
    const { Model } = sequelize.Sequelize;
    class Product extends Model {}
    Product.init(
        {
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        args: true,
                        message: "Name must be filled"
                    }
                }
            },
            image_url: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        args: true,
                        message: "image_url must be filled"
                    }
                }
            },
            price: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        args: true,
                        message: "price must be filled"
                    }
                }
            },
            stock: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        args: true,
                        message: "stock must be filled"
                    },
                    min: 0,
                    isInt: true
                }
            }
        },
        { sequelize }
    );
    Product.associate = function(models) {
        // associations can be defined here
    };
    return Product;
};
