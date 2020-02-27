const { Mall } = require('../models/index')

module.exports = class {
  static addProduct(req, res, next) {
    let { name, file, price, stock, category } = req.body
    Mall.create({
      name,
      imageUrl: file,
      price,
      stock,
      category
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
    let { mallId } = req.params
    Mall.findOne({
      where: {
        id: mallId
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
    Mall.findAll()
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        err.status = 400
        next(err)
      })
  }

  static updateProduct(req, res, next) {
    let { name, imageUrl, price, stock, category } = req.body
    let { mallId } = req.params
    Mall.update(
      {
        name,
        imageUrl,
        price,
        stock,
        category
      },
      {
        where: {
          id: mallId
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
    let { mallId } = req.params
    Mall.destroy({
      where: {
        id: mallId
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
