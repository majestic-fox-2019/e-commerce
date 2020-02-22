const { Product, User } = require('../models/index')

module.exports = class {
  static addProduct(req, res, next) {
    console.log('masuk sini ga ya', req.body, 'masuk cuk kesini')

    let { name, price, stock, category, file } = req.body
    let UserId = res.user.id
    Product.create({
      name,
      imageUrl: file,
      price,
      stock,
      category,
      UserId
    })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        console.log('masuk sini errorrr')
        console.log(err)
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
    // console.log('masuk ke find user product')
    Product.findAll({
      where: {
        UserId: res.user.id
      },
      include: [User]
    })
      .then(result => {
        // console.log(result, 'ini result find product')
        res.status(200).json(result)
      })
      .catch(err => {
        // console.log(err, 'ini error find user product di controller')
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

  static findByCategory(req, res, next) {
    let { category } = req.params
    Product.findAll({
      where: {
        category
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
