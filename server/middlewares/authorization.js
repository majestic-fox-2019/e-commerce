const { Product, User } = require('../models')

function normalAuthorization(req, res, next) {
  const productId = req.params.id
  const userId = req.loggedIn.id
  Product.findOne({ where: { id: productId } })
    .then(result => {
      if (result.UserId !== userId) {
        throw { code: 401, msg: 'You are not authorized' }
      } else {
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

function shopAuthorization(req, res, next) {
  const userId = req.loggedIn.id
  User.findOne({ where: { id: userId } })
    .then(result => {
      if (result.shop_name == null && result.role == 'basic') {
        throw { code: 403, msg: 'Forbidden, you dont have any active shop' }
      } else {
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = { normalAuthorization, shopAuthorization }
