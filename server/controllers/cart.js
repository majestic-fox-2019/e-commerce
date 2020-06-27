const { Cart, User, Product, Transaction } = require('../models')
const createError = require('http-errors')
class Controller {
  static checkStock(req, res, next){
  let errors = []
  let queries = []
  let { items } = req.body

  items.forEach((item) => {
    queries.push(
      Product.findOne({
        where: {
          id: item.id
        }
      })
    )
  })

  Promise.all(queries)
    .then((products) => {
      items.forEach((item) => {
        let orderedProduct = products.find((product) => product.id == item.id)
        if (orderedProduct.stock < item.quantity) {
          errors.push(orderedProduct.name)
        } 
      })
      if (errors.length > 0) {
        let error = {
          status: 400,
          name: 'Insufficient Stock',
          message: errors
        }
        throw error
      } else {
        res.status(200).json({
          msg: 'Transaction available'
        })
      }
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })
  }

  static create(req, res, next) {
    const data = {
      UserId: req.userInfo.id,
      ProductId: req.body.id,
      quantity: req.body.quantity
    }
    Cart.findOne({
      where: {
        ProductId: req.body.id,
        UserId: req.userInfo.id,
        confirm: false
      }
    })
    .then((cart)=> {
      if (cart) {
        return Cart.increment('quantity', { 
          by: req.body.quantity,
          where: {
            ProductId: req.body.id,
            UserId : req.userInfo.id
          }
        })
      } else {
        return Cart.create(data)
      }
    })
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
        UserId: req.userInfo.id,
        confirm: false
      },
      order: [['createdAt', 'ASC']],
      include: [{model: Product}]
    })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static readOnConfirm(req, res, next) {
    let target = {
        confirm: true
      }
    if (!req.userInfo.isAdmin) {
      target.UserId = req.userInfo.id
    }
    const sequelize = require('sequelize')
    Cart.findAll({
      where: target,
      order: [['updatedAt', 'DESC']],
      include: [
        {
          model: User, 
          attributes: { 
            exclude : ['password', 'createdAt', 'updatedAt', 'platform', 'isAdmin']
          }
        }, 
        {
          model: Product,
          attributes: {
            exclude: ['UserId']
          }
        }
      ]
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
          UserId: req.userInfo.id,
          ProductId : req.body.id,
          confirm: false
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
        queries = []
        orderItems.forEach((item) => {
          queries.push(
            Cart.update(
              {
                confirm: true
              },
              {
                where: {
                  UserId: req.userInfo.id,
                  ProductId: item.id
                }
              }
            )
          )
        }) 
        return Promise.all(queries)
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

  static approve (req, res, next) {
    Cart.findOne({
      where: {
        UserId: req.body.userId,
        ProductId: req.body.productId,
        confirm: true,
        approved: false
      }
    })
    .then((cart)=> {
      return Cart.update(
        {
          approved: true
        },
        {
          where: {
            UserId: req.body.userId,
            ProductId: req.body.productId,
            confirm: true,
            approved: false
          },
          returning: true,
          plain: true
        }
      )
    })
    .then((result)=> {
      res.status(200).json(result[1])
    })
    .catch((err) => {
      next(err)
    })
  }

  static confirmOrder(req, res, next) {
    let product
    Cart.findOne({
      where: {
        UserId: req.userInfo.id,
        ProductId: req.body.productId,
        confirm: true,
        approved: true
      },
      include: [{
        model:Product
      }],
    })
      .then((cart) => {
        product = cart
        return Transaction.create({
          UserId: req.userInfo.id,
          ProductId: cart.ProductId,
          quantity: cart.quantity
        })
      })
      .then(() => {
        return Cart.destroy({
          where: {
            UserId: req.userInfo.id,
            ProductId: product.ProductId,
            confirm: true,
            approved: true
          }
        })
      })
      .then(()=> {
        res.status(200).json({
          msg: 'Order has been confirmed',
          product: product.Product.name
        })
      })
      .catch((err) => {
        next(err)
      })
  }

  static delete(req, res, next) {
    let product
    Cart.findOne({
      where: {
        UserId: req.userInfo.id,
        ProductId : req.body.id,
        confirm: false
      },
      include: [Product]
    })
    .then((cart) => {
      product = cart.Product
      if (!cart) {
        createError(404, 'Product not found')
      } else {
        return Cart.destroy({
          where: {
            UserId: req.userInfo.id,
            ProductId : req.body.id,
            confirm: false
          }
        })  
      }
    })
      .then(() => {
        res.status(200).json(product)
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = Controller
