const { Product, User } = require('../models')

class ProductController {
  static getAllProducts(req, res, next) {
    Product.findAll({
      include: [{ model: User, attributes: ['name', 'shop_name'] }]
    })
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        next(err)
      })
  }

  static getMyProducts(req, res, next) {
    const userId = req.loggedIn.id
    Product.findAll({
      where: { UserId: userId },
      include: [{ model: User, attributes: ['name', 'shop_name'] }]
    })
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
    Product.findAll({
      where: { category: category },
      include: [{ model: User, attributes: ['name', 'shop_name'] }]
    })
      .then(results => {
        res.status(200).json(results)
      })
      .catch(next)
  }

  static getOneDetail(req, res, next) {
    Product.findOne({
      where: { id: req.params.id },
      include: [{ model: User, attributes: ['name', 'shop_name'] }]
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static createNew(req, res, next) {
    const data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stocks: req.body.stocks,
      status: req.body.status,
      category: req.body.category,
      image_url: req.body.image_url,
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
      price: req.body.price,
      stocks: req.body.stocks,
      status: req.body.status,
      category: req.body.category,
      image_url: req.body.image_url,
      UserId: req.loggedIn.id
    }
    console.log(data)
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
