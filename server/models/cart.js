'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Cart extends Model {}

  Cart.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ProductId: {
      type: DataTypes.UUID,
    },
    UserId: {
      type: DataTypes.UUID,
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: 100,
          msg: 'Maximum Qty is 100'
        },
        minValue(value) {
          if(value < 0) {
            throw new Error('Minimum Qty is 0')
          }
        }
      }
    },
    price: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize
  });
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};