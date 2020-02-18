const {Cart, Product, User} = require('../models')

class CartController {

  static add(req, res, next){
    let cartData = {
      UserId: req.user.id,
      ProductId: req.params.id
    }
    Cart.create(cartData)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => {
      next(error)
    })
  }

  static list(req, res, next){
    User.findByPk(req.user.id, {include: Product})
    .then(result => {
      let allProducts = []
      result.Products.forEach(product => {
        allProducts.push(product)
      })
      res.status(200).json(allProducts)
    })
    .catch(error => {
      next(error)
    })
  }
  

  // static editAmount(req, res, next){

  // }

  // static delete(req, res, next){
  //   Cart.destroy
  // }

}

module.exports = CartController