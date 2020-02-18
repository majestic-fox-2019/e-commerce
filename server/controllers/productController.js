const { Product } = require('../models')

class ProductController {
  static getAllProducts(req, res, next) {
    Product.findAll()
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        next(err)
      })
  }

  static getByCategories(req, res, next) {
    const category = req.params.category
    console.log(category)
    Product.findAll({ where: { category: category } })
      .then(results => {
        res.status(200).json(results)
      })
      .catch(next)
  }

  static getOneDetail(req, res, next) {
    Product.findOne({ where: { id: req.params.id } })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static createNew(req, res, next) {
    const data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.description,
      stocks: req.body.stocks,
      image_url: req.body.image_url,
      category: req.body.category,
      UserId: req.loggedIn.id
    }
    Product.create(data)
      .then(result => {
        res.status(201).json({
          data: result,
          msg: 'New product created'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static editData(req, res, next) {
    const data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.description,
      stocks: req.body.stocks,
      image_url: req.body.image_url,
      category: req.body.category,
      UserId: req.loggedIn.id
    }
    Product.update(data, { where: { id: req.params.id } })
      .then(result => {
        res.status(200).json({
          msg: 'Product updated'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteData(req, res, next) {
    Product.destroy({ where: { id: req.params.id } })
      .then(result => {
        res.status(200).json({
          msg: 'Product deleted'
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProductController
