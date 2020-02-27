'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Cart extends Model { }

  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please enter user id"
        },
        notNull: {
          msg: "Please enter user id"
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please enter product id"
        },
        notNull: {
          msg: "Please enter product id"
        }
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: "Amount can't be less than zero"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      isIn: [[true, false]]
    }
  }, {
    sequelize, hooks: {
      beforeCreate(instance, option) {
        instance.amount = 1
      }
    }
  })

  Cart.associate = function (models) {
    // associations can be defined here
    Cart.belongsTo(models.Product)
  };
  return Cart;
};