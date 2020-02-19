'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const { hash } = require('../helpers/bcrypt')

  class User extends Model { }

  User.init({
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill in all fields'
        },
        notEmpty: {
          msg: 'Please fill in all fields'
        },
        isEmail: {
          msg: 'Please use the correct email format'
        },
        isUnique: function (value, next) {
          User.findOne({
            where: { email: value }
          })
            .done(function (user) {
              if (user)
                next('email has already been used');
              next();
            });
        }
      }
    },
    address: {
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
    password: {
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
    shopName: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['admin', 'user']],
          msg: 'Invalid input'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill in all fields'
        },
        notEmpty: {
          msg: 'Please fill in all fields'
        },
        is: {
          args: /^08[0-9]{9,10}$/i,
          msg: 'Please user the correct Indonesian phone number format'
        },
        phoneIsUnique: function (value, next) {
          User.findOne({
            where: { phone: value }
          })
            .done(function (user) {
              if (user)
                next('phone has already been used');
              next();
            });
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance) {
      return hash(instance.dataValues.password)
      .then(hashedPass => {
        instance.dataValues.password = hashedPass
      })
      .catch(err => {
        console.log(err)
      })
      }
    },
    sequelize
  })

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Product)
    User.belongsToMany(models.Product, { through: models.Cart })
    User.belongsToMany(models.Product, { through: models.Income })
    // User.belongsToMany(models.Product, { through: models.Purchase })
  };
  return User;
};