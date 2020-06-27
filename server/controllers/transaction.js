const { Transaction, User, Product } = require('../models')

class Controller {
  static readAll(req, res, next) {
    let target = {}
    if (!req.userInfo.isAdmin) {
      target.UserId = req.userInfo.id
    }
    Transaction.findAll(
      {
        where: target,
        include: [
        {
          model: User, 
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt']
          }
        },{
          model: Product
        }
      ]
      }
    )
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
