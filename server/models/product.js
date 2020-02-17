'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Product extends Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
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
    desc: {
      type: DataTypes.STRING,
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
    price: {
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
    stock: {
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
    img_url: {
      type: DataTypes.STRING,
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
    category: {
      type: DataTypes.STRING,
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

  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User)
  };
  return Product;
};