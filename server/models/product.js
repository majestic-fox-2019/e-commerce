"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Product extends Model {}

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "name must be filled"
          },
          notEmpty: {
            args: true,
            msg: "name must be filled"
          }
        }
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "imageUrl must be filled"
          },
          notEmpty: {
            args: true,
            msg: "imageUrl must be filled"
          }
        }
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          notNull: {
            args: true,
            msg: "price must be filled"
          },
          notEmpty: {
            args: true,
            msg: "price must be filled"
          }
        }
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          notNull: {
            args: true,
            msg: "stock must be filled"
          },
          notEmpty: {
            args: true,
            msg: "stock must be filled"
          }
        }
      },
      CategoryId: {
        type: DataTypes.INTEGER
      }
    },
    { sequelize }
  );

  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Category);
  };
  return Product;
};
