'use strict'
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.STRING,
      stocks: DataTypes.INTEGER,
      image_url: DataTypes.STRING,
      status: DataTypes.STRING,
      category: DataTypes.STRING,
      UserId: DataTypes.INTEGER
    },
    {}
  )
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User)
    Product.belongsToMany(models.User, { through: models.Cart })
  }
  return Product
}
