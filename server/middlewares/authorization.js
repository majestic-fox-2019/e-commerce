const {Cart} = require('../models')
const {User} = require('../models')
const createError = require('http-errors')

class Authorization {

  static admin(req, res, next){
    User.findOne({where: { email: req.user.email}})
    .then(user => {
      if (!user){
        throw createError(404, {message: "Not Found"})
      } else if (user.role !== 'admin'){
        console.log('masuk sini')
        throw createError(401, {message: "Not Authorized"})
      } else {
        next()
      }
    })
    .catch(error => {
      next(error)
    })
  }

  static cart(req, res, next){
    let data = {
      where: {
        UserId: req.user.id,
        ProductId: req.params.id
      }
    }
    Cart.findOne(data)
    .then(cart => {
      if (!cart){
        throw createError(404, {message: "Not Found"})
      } else if (cart.UserId !== req.user.id){
        throw createError(401, {message: "Not Authorized"})
      } else {
        next()
      }
    })
    .catch(error => {
      next(error)
    })
  }

}


module.exports = Authorization