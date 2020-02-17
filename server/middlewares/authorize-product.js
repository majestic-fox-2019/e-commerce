const { Product, User } = require('../models')
const createError = require('http-errors')

function checkProduct(req, res, next) {
  Product.findOne({
    where: {
      id: req.params.id
    }
  })
    .then((product) => {
      if (!product) {
        let err = createError(404, 'Product not found')
        next(err)
      } else {
        next()
      }
    })
    .catch((err) => {
      next(err)
    })
}

function authorize(req, res, next) {
  User.findOne({
    where: {
      id: req.userInfo.id,
      isAdmin: true
    }
  })
    .then((result) => {
      if (!result) {
        let err = createError(403, 'Forbidden Access')
        next(err)
      } else {
        next()
      }
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = {
  checkProduct,
  authorize
}
