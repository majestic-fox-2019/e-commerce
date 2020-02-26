const { Cart, Product, Income } = require('../models')

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
      checkout.push(
        Cart.update(
          { status: 'check' },
          { where: { id: cart[i].id }, returning: true }
        )
      )
    }
    Promise.all(checkout)
      .then(final => {
        res.status(200).json({
          message: 'Cart checkout'
        })
      })
      .catch(next)
  }

  static getActiveTransaction(req, res, next) {
    const id = req.loggedIn.id
    Cart.findAll({ where: { UserId: id, status: 'check' }, include: [Product] })
      .then(results => {
        res.status(200).json(results)
      })
      .catch(next)
  }

  static confirmTransaction(req, res, next) {
    const id = req.params.id
    const totalPrice = req.body.totalPrice
    let cart = null
    let incomeState = null
    Cart.update(
      { status: 'paid', price: totalPrice },
      { where: { id: id }, returning: true }
    )
      .then(result => {
        cart = result[1][0]
        return Product.findOne({ where: { id: cart.ProductId } })
      })
      .then(product => {
        incomeState = {
          UserId: product.UserId,
          CartId: cart.id
        }
        const newStocks = product.stocks - cart.qty
        return Product.update(
          { stocks: newStocks },
          { where: { id: product.id } }
        )
      })
      .then(final => {
        return Income.create(incomeState)
      })
      .then(income => {
        res.status(201).json(income)
      })
      .catch(next)
  }

  static getHistoryTransaction(req, res, next) {
    const id = req.loggedIn.id
    Cart.findAll({ where: { UserId: id, status: 'paid' } })
      .then(results => {
        res.status(200).json(results)
      })
      .catch(next)
  }

  static getUserIncome(req, res, next) {
    const id = req.loggedIn.id
    Income.findAll({ where: { UserId: id } })
      .then(results => {
        res.status(200).json(results)
      })
      .catch(next)
  }
}

module.exports = CartController
