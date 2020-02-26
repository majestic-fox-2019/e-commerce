'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Transaction extends Model {}

  Transaction.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    code_transaction: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Code transaction must be filled"
        },
        notNull: {
          args: true,
          msg: "Please enter your code transaction"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name must be filled"
        },
        notNull: {
          args: true,
          msg: "Please enter your name"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Address must be filled"
        },
        notNull: {
          args: true,
          msg: "Please enter your address"
        }
      }
    },
    products: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Product must be filled"
        },
        notNull: {
          args: true,
          msg: "Please enter your products"
        }
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Total price must be filled"
        },
        notNull: {
          args: true,
          msg: "Please give total price"
        }
      }
    }
  },
  {
    sequelize
  })

  Transaction.associate = function(models) {
    
  };
  return Transaction;
};