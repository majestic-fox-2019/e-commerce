'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Product extends Model {}

  Product.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name is required'
        },
        isRequired(value) {
          if(!value) {
            throw new Error ('Name is required')
          }
        },
      }
    },
    description: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isDecimal: {
          args: false,
          msg: 'Price cannot decimal',
        },
        isNegative(value) {
          if(value < 0) {
            throw new Error('Negatif value is not allow')
          }
        },
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isDecimal: {
          args: false,
          msg: 'Stock cannot decimal',
        },
        isNegative(value) {
          if(value < 0) {
            throw new Error('Negatif value is not allow')
          }
        },
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Category is required'
        },
        isRequired(value) {
          if(!value) {
            throw new Error ('Category is required')
          }
        },
      }
    },
  }, {
    sequelize
  });
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.Cart)
    Product.hasMany(models.Transaction)
  };
  return Product;
};