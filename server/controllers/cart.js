const { Cart, Product, Transaction } = require('../models')
class Controller {
  static create(req, res, next) {
    const data = {
      UserId: req.userInfo.id,
      ProductId: req.body.id,
      quantity: req.body.quantity
    }
    Cart.create(data)
      .then((result) => {
        res.status(201).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static read(req, res, next) {
    Cart.findAll({
      where: {
        UserId: req.userInfo.id
      }
    })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static updateQuantity(req, res, next) {
    Cart.update(
      {
        quantity: req.body.quantity
      },
      {
        where: {
          UserId: req.userInfo.id
        },
        returning: true,
        plain: true
      }
    )
      .then((result) => {
        res.status(200).json(result[1])
      })
      .catch((err) => {
        next(err)
      })
  }

  static checkout(req, res, next) {
    let queries = []
    let { orderItems } = req
    orderItems.forEach((item) => {
      queries.push(
        Product.update(
          {
            stock: item.stock
          },
          {
            where: {
              id: item.id
            }
          }
        )
      )
    })
    Promise.all(queries)
      .then(() => {
        return Cart.update(
          {
            confirm: true
          },
          {
            where: {
              UserId: req.userInfo.id
            }
          }
        )
      })
      .then(() => {
        res.status(200).json({
          msg: 'Cart status updated'
        })
      })
      .catch((err) => {
        next(err)
      })
  }

  static confirmOrder(req, res, next) {
    let cartList = []
    Cart.findAll({
      where: {
        UserId: req.userInfo.id,
        confirm: true
      },
      attributes: ['id']
    })
      .then((carts) => {
        carts.forEach((cart) => {
          cartList.push(
            Transaction.create({
              UserId: req.userInfo.id,
              ProductId: cart.id,
              date_purchased: new Date()
            })
          )
        })
        return Promise.all(cartList)
      })
      .then(() => {
        Cart.destroy({
          where: {
            UserId: req.userInfo.id,
            confirm: true
          }
        })
        res.status(200).json({
          msg: 'Cart dismissed due to order confirmation'
        })
      })
      .catch((err) => {
        next(err)
      })
  }

  static delete(req, res, next) {
    Cart.destroy({
      where: {
        UserId: req.userInfo.id,
        confirm: false
      }
    })
      .then((result) => {
        res.status(200).json({
          deleted_row: result
        })
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = Controller
