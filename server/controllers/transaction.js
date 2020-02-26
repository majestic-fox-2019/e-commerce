require('dotenv').config()
const {Transaction, User, Product, Cart} = require('../models')
const formatDate = require('../helpers/formatDate')
const sentEmail = require('../helpers/sentEmail')

class TransactionController {

  static list(req, res, next) {
    let userId = {
      where: {
        UserId: req.user.id
      }
    }
    Transaction.findAll(userId)
    .then(transaction => {
      res.status(200).json(transaction)
    })
    .catch(err => {
      next(err)
    })
  }

  static add(req, res, next) {
    let arrCart = []
    let arrName = []
    let dateFix = formatDate(new Date())
    User.findByPk(req.user.id, {include: Product})
    .then(result => {
      let arrUpdate = []
      result.Products.forEach(cart => {
        let data = {}
        data.productId = cart.Cart.ProductId
        data.amount = cart.Cart.amount
        data.stock = cart.stock
        data.name = cart.name
        arrName.push(cart.name)
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
      let transactionData = {
        UserId: req.user.id,
        products: arrName,
        date: dateFix
      }
      return Transaction.create(transactionData)
    })
    .then(transaction => {
      let deleteAll = {
        where: {
          UserId: req.user.id
        }
      }
      return Cart.destroy(deleteAll)
    })
    .then(result => {
      // console.log(req.body.total, typeof req.body.total)
      sentEmail(req.user.email, dateFix, req.user.name, arrCart, String(req.body.total))

      res.status(200).json({message: 'Succesfully checkout!'})
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = TransactionController