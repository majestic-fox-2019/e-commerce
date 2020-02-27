const { UserProduct, Product, User } = require('../models')

class UserProductController {
  static create(req, res, next) {
    let data = {
      UserId: req.user.id,
      ProductId: Number(req.params.ProductId),
    }
    let amount = Number(req.body.amount) || 1
    let stock = req.body.stock

    UserProduct
      .findOne({
        where: data
      })
      .then(result => {
        if (result) {
          if (amount >= stock) {
            let error = {
              statusCode: 400,
              message: `Maximum amount is ${stock}`
            }
            throw error
          } else {
            return UserProduct
              .update({
                amount: Number(result.amount) + amount
              }, {
                where: data,
                returning: true
              })
              .then(cart => {
                res.status(201).json(cart[1][0])
              })
              .catch(err => {
                next(err)
              })
          }
        } else {
          if (stock == 0) {
            let error = {
              statusCode: 400,
              message: 'Out of stock'
            }
            throw error
          }
          if (amount >= stock) {
            let error = {
              statusCode: 400,
              message: `Maximum amount is ${stock}`
            }
            throw error
          } else {
            return UserProduct
              .create({
                UserId: req.user.id,
                ProductId: req.params.ProductId,
                amount: amount
              })
          }
        }
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteItem(req, res, next) {
    let user = req.user.id
    let product = req.params.ProductId
    UserProduct
      .destroy({
        where: {
          UserId: user,
          ProductId: product
        }
      })
      .then(carts => {
        if (carts) {
          res.status(200).json({ message: "succesfully delete item!" })
        } else {
          let error = {
            statusCode: 404,
            message: 'Item not found!'
          }
          throw error
        }
      })
      .catch(next)
  }

  static checkoutCart(req, res, next) {
    let user = req.user.id
    User
      .findOne({
        where: {
          id: user
        },
        include: Product
      })
      .then(result => {
        let products = result.Products

        let outOfStock = []
        products.forEach(product => {
          if (product.stock < result.Products.stock) {
            outOfStock.push(` Stock ${product} is not enought`)
          }
        })

        let error = {
          statusCode: 400,
          message: outOfStock
        }
        if (outOfStock.length > 0) {
          throw error
        } else {
          let successUpdate = []

          products.forEach(product => {
            let updated = Number(product.stock) - Number(product.UserProduct.amount)

            let updateStock = Product
              .update({
                stock: updated
              }, {
                where: { id: product.id }
              })

            successUpdate.push(updateStock)
          })
          let deleteCart = UserProduct
            .destroy({
              where: {
                UserId: user
              }
            })
          successUpdate.push(deleteCart)
          return Promise.all(successUpdate)
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateAmount(req, res, next) {
    let user = req.user.id
    let product = req.params.ProductId
    let amount = req.body.amount
    let stock = req.body.stock
    if (amount < 0) {
      let error = {
        statusCode: 400,
        message: "Amount can't be 0!"
      }
      throw error
    }
    if (amount > stock) {
      let error = {
        statusCode: 400,
        message: `Maximum amount is ${stock}`
      }
      throw error
    }
    UserProduct
      .update({ amount }, {
        where: {
          UserId: user,
          ProductId: product
        },
        returning: true
      })
      .then(result => {
        res.status(200).json(result[1][0])
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserProductController