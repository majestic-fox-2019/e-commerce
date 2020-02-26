const {Cart, Product, User} = require('../models')

class CartController {

  static add(req, res, next){
    let cartData = {
      UserId: req.user.id,
      ProductId: req.params.id,
      total: req.body.total,
      amount: req.body.amount
    }

    let cartFind = {
      where: {
        UserId: req.user.id,
        ProductId: req.params.id
      }
    }
    Product.findByPk(req.params.id, {hooks: false})
    .then(product => {
      if (product.stock == 0) {
        throw res.status(400).json({message: 'This Product is out of stock'})
      } else {
        return Cart.findOne(cartFind)
      }
    })
    .then(cart => {
      console.log(cart, 'masuk then')
      if (cart) {
        let updateData = {
          amount: cart.amount += 1
        }
        if (updateData.amount > 30) {
          throw res.status(400).json({message: "You've reached the order limit"})
        } else {
          console.log(updateData, 'masuk else')
          return Cart.update(updateData, cartFind)
        }
      } else {
        return Cart.create(cartData)
      }
    })
    .then(result => {
      res.status(201).json('Succesfully added to cart')
    })
    .catch(error => {
      next(error)
    })
  }

  static list(req, res, next){
    User.findByPk(req.user.id, {include: Product})
    .then(result => {
      res.status(200).json(result.Products)
    })
    .catch(error => {
      next(error)
    })
  }
  
  static editAmount(req, res, next){
    let cartData = {
      where: {
        UserId: req.user.id,
        ProductId: req.params.productId
      }
    }

    let updateAmount = {
      amount: req.body.amount
    }

    Cart.update(updateAmount, cartData)
    .then(result => {
      res.status(200).json({message: 'Succesfully Edit Amount'})
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteAll(req, res, next){
    let arrCart = []
    User.findByPk(req.user.id, {include: Product})
    .then(result => {
      let arrUpdate = []
      result.Products.forEach(cart => {
        let data = {}
        data.productId = cart.Cart.ProductId
        data.amount = cart.Cart.amount
        data.stock = cart.stock
        data.name = cart.name
        arrCart.push(data)
      })
      arrCart.forEach(el => {
        console.log(el)
        if (el.stock - el.amount < 0) {
          console.log('masuk if')
          throw res.status(400).json({message: `${el.name} is out of stock, ${el.stock} stock left`})
        } else {
          let objId = {
            where: {}
          }
          let objData = {}
          console.log(el)
          objId.where.id = el.productId
          objData.stock = el.stock - el.amount
          console.log(objData, objId)
          arrUpdate.push(Product.update(objData, objId))
        }
      })
      console.log(arrUpdate)
      return Promise.all(arrUpdate)
    })
    .then(product => {
      let deleteAll = {
        where: {
          UserId: req.user.id
        }
      }
      return Cart.destroy(deleteAll)
    })
    .then(result => {
      res.status(200).json({message: 'Succesfully checkout!'})
    })
    .catch(err => {
      next(err)
    })
  }

  static delete(req, res, next){
    let cartDelete = {
      where: {
        UserId: req.user.id,
        ProductId: req.params.productId
      }
    }
    Cart.destroy(cartDelete)
    .then(result => {
      res.status(200).json({message: 'Successfully deleted cart'})
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = CartController