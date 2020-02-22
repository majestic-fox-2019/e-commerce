const { Product, Category } = require('../models')

class ProductController {
  static createProduct(req, res, next) {
    let { name, image, price, stock, CategoryId } = req.body
    Product
      .create({
        name, image, price, stock, CategoryId
      })
      .then(product => {
        res.status(201).json(product);
      })
      .catch(err => {
        next(err)
      })
  }

  static showProduct(req, res, next) {
    Product
      .findAll({
        include: Category,
        order: [['id', 'ASC']]
      })
      .then(products => {
        res.status(200).json(products)
      })
      .catch(err => {
        next(err)
      })
  }

  static showOneProduct(req, res, next) {
    let id = req.params.id
    Product
      .findByPk(id)
      .then(product => {
        res.status(200).json(product)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateProduct(req, res, next) {
    let product = {
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      stock: req.body.stock,
      CategoryId: req.body.CategoryId
    }
    let id = req.params.id

    Product
      .update(product, {
        where: {
          id: id
        },
        returning: true
      })
      .then(product => {
        res.status(200).json(product[1][0])
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteProduct(req, res, next) {
    let deleted = {}
    let id = req.params.id

    Product
      .findByPk(id)
      .then(product => {
        deleted = product
        return Product
          .destroy({
            where: {
              id: id
            }
          })
      })
      .then(product => {
        res.status(200).json(deleted)
      })
      .catch(err => {
        next(err)
      })

  }
}

module.exports = ProductController