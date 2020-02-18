'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize
  class Product extends Model { }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Name should not be empty"
        },
        notEmpty: {
          args: true,
          msg: "Name should not be empty"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
        notNull: {
          args: true,
          msg: "Image should not be empty"
        },
        notEmpty: {
          args: true,
          msg: "Image should not be empty"
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
          msg: "Price should not be empty"
        },
        notEmpty: {
          args: true,
          msg: "Price should not be empty"
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
          msg: "Stock should not be empty"
        },
        notEmpty: {
          args: true,
          msg: "Stock should not be empty"
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        notNull: {
          args: true,
          msg: "Category should not be empty"
        },
        notEmpty: {
          args: true,
          msg: "Category should not be empty"
        }
      }
    }
  }, { sequelize })

  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsToMany(models.User, { through: models.UserProduct })
    Product.belongsTo(models.Category)
  };
  return Product;
};