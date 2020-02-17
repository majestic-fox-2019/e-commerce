const Product = require('../models').Product
const User = require('../models').User
const Cart = require('../models').Cart

class ControllerProduct{ 
  //ADMIN ONLY
  static createProduct(req, res, next) {
    let {name, stock, category, image_url, price} = req.body
    Product.create({name, stock, category, image_url, price})
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteProduct(req, res, next) {
    let product
    Product.findOne({where: {id:req.params.id}})
    .then(data => {
      product = data
      return Product.destroy({where: {id: req.params.id}})
    })
    .then(data => {
      res.status(201).json(product)
    })
    .catch(err => {
      next(err)
    })
  }

  static updateProduct(req, res, next) {
    let {name, stock, category, image_url, price} = req.body
    Product.update({name, stock, category, image_url, price}, {where:{id:req.params.id}, returning: true})
    .then(product => {
      console.log(product)
      res.status(201).json(product)
    })
    .catch(err => {
      next(err)
    })
  }

  //USERSS
  static showProducts (req, res, next) {
    Product.findAll()
    .then(products => {
      res.status(201).json(products)
    })
    .catch(err => {
      next(err)
    })
  }

  static addToCart(req, res, next) {
    let user
    let product
    User.findOne({include: [Product], where: {id: req.user}})
    .then(data => {
      user = data
      return Product.findOne({where:{id:req.params.id}})
    })
    .then(data => {
      product = data
      if(product.stock - req.body.jumlah < 1) {
        next({code:401, message: "sorry we were out of stocks!"})
      } else {
        product.stock = product.stock - req.body.jumlah
        return Cart.create({UserId:user.id, ProductId:product.id})
      }
    })
    .then(data => {
      res.status(201).json(user)
    })
    .catch(err => {
      next(err)
    })
  }

  static removeFrommCart(req, res, next) {

  }
}

module.exports = ControllerProduct