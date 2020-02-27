'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Cart extends Model {}

  Cart.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "UserId must be filled"
        },
        notNull: {
          args: true,
          msg: "Please give UserId"
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "ProductId must be filled"
        },
        notNull: {
          args: true,
          msg: "Please give ProductId"
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Quantity must be filled"
        },
        notNull: {
          args: true,
          msg: "Please give quantity"
        }
      }
    }
  },
  {
    sequelize
  })

  Cart.associate = function(models) {
    Cart.belongsTo(models.Product)
  };
  return Cart;
};