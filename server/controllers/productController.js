const { Product, User } = require('../models/index')

module.exports = class {
  static addProduct(req, res, next) {
    let { name, imageUrl, price, stock, category } = req.body
    let UserId = res.user.id
    Product.create({
      name,
      imageUrl,
      price,
      stock,
      category,
      UserId
    })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        err.status = 400
        next(err)
      })
  }

  static findOne(req, res, next) {
    let { productId } = req.params
    Product.findOne({
      where: {
        id: productId
      }
    })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        err.status = 400
        next(err)
      })
  }

  static findAll(req, res, next) {
    Product.findAll({
      include: [User]
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        err.status = 400
        next(err)
      })
  }

  static findUserProduct(req, res, next) {
    Product.findAll({
      where: {
        UserId: res.user.id
      },
      include: [User]
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err, 'ini error find user product di controller')

        err.status = 400
        next(err)
      })
  }

  static updateProduct(req, res, next) {
    let { name, imageUrl, price, stock, category } = req.body
    let { productId } = req.params
    Product.update(
      {
        name,
        imageUrl,
        price,
        stock,
        category
      },
      {
        where: {
          id: productId
        },
        plain: true,
        returning: true
      }
    )
      .then(result => {
        // console.log('masuk kesini', result.body)
        res.status(200).json(result)
      })
      .catch(err => {
        err.status = 400
        next(err)
      })
  }

  static deleteProduct(req, res, next) {
    let { productId } = req.params
    Product.destroy({
      where: {
        id: productId
      }
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        err.status = 400
        next(err)
      })
  }
}
