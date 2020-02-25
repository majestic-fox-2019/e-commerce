const { Cart, Product } = require('../models')

class CartController {
  static getUserCart(req, res, next) {
    Cart.findAll({
      where: { UserId: req.loggedIn.id, status: 'unpaid' },
      include: [Product]
    })
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
      status: 'unpaid',
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

  static deleteFromCart(req, res, next) {
    const id = req.params.id
    Cart.destroy({ where: { id: id } })
      .then(response => {
        res.status(200).json({
          message: 'Item removed'
        })
      })
      .catch(next)
  }

  static checkoutAll(req, res, next) {
    const cart = req.body.cart
    let checkout = []
    for (let i = 0; i < cart.length; i++) {
      let newStocks = cart[i].Product.stocks - cart[i].qty
      checkout.push(
        Product.update(
          { stocks: newStocks },
          { where: { id: cart[i].ProductId }, returning: true }
        )
      )
    }
    Promise.all(checkout)
      .then(result => {
        let update = []
        for (let i = 0; i < cart.length; i++) {
          update.push(
            Cart.update(
              { status: 'paid' },
              { where: { id: cart[i].id }, returning: true }
            )
          )
        }
        return Promise.all(update)
      })
      .then(final => {
        res.status(200).json({
          message: 'Cart checkout'
        })
      })
      .catch(next)
  }
}

module.exports = CartController
