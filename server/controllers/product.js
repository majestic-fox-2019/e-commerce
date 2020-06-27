const { Product } = require('../models')
const createError = require('http-errors')

class Controller {
  static create(req, res, next) {
    const data = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      category: req.body.category,
      image_url: req.body.image_url,
      UserId: req.userInfo.id
    }
    Product.create(data)
      .then((result) => {
        res.status(201).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static readAll(req, res, next) {
    Product.findAll({
      order: [['updatedAt', 'DESC']]
    })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static readOne(req, res, next) {
    Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((result) => {
        if (!result) {
          let err = createError(404, 'Product not found')
          next(err)
        } else {
          res.status(200).json(result)
        }
      })
      .catch((err) => {
        next(err)
      })
  }

  static update(req, res, next) {
    const data = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      category: req.body.category,
      image_url: req.body.image_url
    }
    // console.log(data)
    Product.update(data, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    })
      .then((result) => {
        res.status(200).json(result[1])
      })
      .catch((err) => {
        next(err)
      })
  }

  static delete(req, res, next) {
    let product
    Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((result) => {
        product = result
        return Product.destroy({
          where: {
            id: req.params.id
          }
        })
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
