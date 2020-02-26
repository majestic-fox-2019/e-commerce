'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Cart extends Model { }
  Cart.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER
    },
    ProductId: {
      type: DataTypes.INTEGER
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill stock"
        },
        min: {
          args: 1,
          msg: "minimal qty 1"
        }
      }
    },
    status: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate: (order) => {
        order.status = 'in cart'
      }
    },
    sequelize
  });
  Cart.associate = function (models) {
    // associations can be defined here
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};