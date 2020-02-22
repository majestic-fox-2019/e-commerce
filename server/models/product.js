'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model { }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill name product"
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill description"
        },
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill image_url"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill price"
        },
        min: {
          args: 1000,
          msg: "minimal price Rp.1000"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill stock"
        },
        min: {
          args: 1,
          msg: "minimal stock 1"
        }
      }
    },
    UserId: { type: DataTypes.INTEGER },
    category: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["Pakaian Pria", "Pakaian Wanita", "Sepatu Pria", "Fashion Bayi", "Tas Pria", "Tas Wanita"]],
          msg: "please add correct category"
        }
      }
    }
  }, {
    sequelize
  });
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsToMany(models.User, { through: models.Cart })
  };
  return Product;
};