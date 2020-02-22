const {Product} = require('../models')
const createError = require('http-errors')
const convertRp = require('../helpers/convertRupiah')

class ProductController {

  static list(req, res, next){
    Product.findAll({order: [['id', 'ASC']]})
    .then(product => {
      res.status(200).json(product)
    })
    .catch(error => {
      next(error)
    })
  }

  static getById(req, res, next){
    Product.findByPk(req.params.id, {hooks: false})
    .then(product => {
      product.price = convertRp(product.price)
      res.status(200).json(product)
    })
    .catch(error => {
      next(error)
    })
  }

  static add(req, res, next){
    let productData = {
      name: req.body.name,
      description: req.body.description,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }

    Product.create(productData)
    .then(product => {
      console.log('masuk')
      res.status(201).json(product)
    })
    .catch(error => {
      console.log(error)
      // res.send(error)
      next(error)
    })
  }

  static edit(req, res, next){
    let productId = {
      where: {
        id: req.params.id
      }
    }

    let productData = {
      name: req.body.name,
      description: req.body.description,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }

    Product.update(productData, productId)
    .then(product => {
      res.status(200).json(productData)
    })
    .catch(error => [
      next(error)
    ])
  }

  static delete(req, res, next){
    let productId = {
      where: {
        id: req.params.id
      }
    }
    let productData = Product.findByPk(req.params.id)
    let productDestroy = Product.destroy(productId)
    Promise.all([productData, productDestroy])
    .then(result => {
      res.status(200).json(`Successfully deleted ${result[0].name} on product`)
    })
    .catch(error => {
      next(error)
    })
  }

}

module.exports = ProductController