const { Cart } = require('../models')

class CartController {
  static getUserCart(req, res, next) {
    Cart.findAll({ where: { UserId: req.loggedIn.id } })
      .then(results => {
        res.status(200).json(results)
      })
      .catch(next)
  }

  static addToCart(req, res, next) {
    const data = {
      UserId: req.loggedIn.id,
      ProductId: req.body.ProductId,
      qty: req.body.qty,
      price: req.body.price
    }
    Cart.create(data)
      .then(result => {
        res.status(201).json({
          result: result
        })
      })
      .catch(next)
  }
}

module.exports = CartController
