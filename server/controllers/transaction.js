const { Transaction, User } = require('../models')

class Controller {
  static readAll(req, res, next) {
    User.findOne({
      where: {
        id: req.userInfo.id
      }
    })
      .then((user) => {
        if (!user.isAdmin) {
          return Transaction.findAll({
            where: {
              UserId: req.userInfo.id
            }
          })
        } else {
          return Transaction.findAll()
        }
      })
      .then((transactions) => {
        res.status(200).json(transactions)
      })
      .catch((err) => {
        next(err)
      })
  }

  //   static delete(req, res, next) {
  //     //   2020-02-18T16:37:37.752Z
  //     const Op = require('sequelize').Op
  //     Transaction.findAll({
  //       where: {
  //         date_purchased: {
  //           [Op.gte]: '2020-02-18T16:37:37.752Z'
  //         }
  //       }
  //     })
  //       .then((result) => {
  //         res.status(200).json(result)
  //       })
  //       .catch((err) => {
  //         next(err)
  //       })
  //   }
}

module.exports = Controller
