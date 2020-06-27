'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Banner extends Model {}
  Banner.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Banner name is required'
          }
        }
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Banner image is required'
          }
        }
      }
    },
    { sequelize }
  )
  Banner.associate = function(models) {
    // associations can be defined here
  }
  return Banner
}
