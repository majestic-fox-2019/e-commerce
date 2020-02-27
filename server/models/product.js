"use strict";
module.exports = (sequelize, DataTypes) => {
    const { Model } = sequelize.Sequelize;
    class Product extends Model { }
    Product.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: {
                        args: true,
                        message: "Name must be filled"
                    }
                }
            },
            detail: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: {
                        args: true,
                        message: "Text must be filled"
                    }
                }
            },
            image_url: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: {
                        args: true,
                        message: "image_url must be filled"
                    }
                }
            },
            price: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: {
                        args: true,
                        message: "price must be filled"
                    }
                }
            },
            stock: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: {
                        args: true,
                        message: "stock must be filled"
                    },
                    min: 0,
                    isInt: true
                }
            },
            CategoryId: {
                type: DataTypes.INTEGER,
            }
        },
        { sequelize }
    );
    Product.associate = function (models) {
        Product.belongsTo(models.Category)
        Product.belongsToMany(models.User, { through: "Cart" })
    };
    return Product;
};
