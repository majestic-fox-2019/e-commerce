'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Cart extends Model {}

  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill in all fields'
        },
        notEmpty: {
          msg: 'Please fill in all fields'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill in all fields'
        },
        notEmpty: {
          msg: 'Please fill in all fields'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['Active', 'CheckedOut']],
          msg: 'Invalid status'
        },
        notNull: {
          msg: 'Please fill in all fields'
        },
        notEmpty: {
          msg: 'Please fill in all fields'
        }
      }
    },
    paid_date: {
      type: DataTypes.DATE
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill in all fields'
        },
        notEmpty: {
          msg: 'Please fill in all fields'
        }
      }
    }
  },{
    sequelize
  })

  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};