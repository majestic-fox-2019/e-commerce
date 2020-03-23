'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Review extends Model { }
  Review.init({
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: { msg: "Rating should be number" }
      }
    },
    review: DataTypes.STRING
  }, { sequelize })

  Review.associate = function (models) {
    // associations can be defined here
    Review.belongsTo(models.Product)
    Review.belongsTo(models.User)
  };
  return Review;
};