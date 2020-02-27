const { Transaction, User, Product } = require('../models/index')
const createError = require('http-errors')

class TransactionController {

  static addTransaction(req, res, next){
    const objValue = {
      ProductId: req.params.product_id,
      UserId: req.params.user_id,
      qty: req.body.qty || 1,
      status: 'unhandled'    
    }
    Transaction
      .findOne({
        where : {
          UserId : req.params.user_id,
          ProductId: req.params.product_id
        }
      })
      .then(response => {
        if(response != null && response.status == 'unhandled'){
          response.qty += +req.body.qty
          const value = {
            qty: response.qty,
            total: response.qty * response.total
          }
          return Transaction
            .update(value, {
              where : {
                UserId : req.params.user_id,
                ProductId: req.params.product_id
              },
              returning: true,
              hooks: true
            })
        }else{
          return Transaction
            .create(objValue)
        }
      })
      .then(response => {
        if(Array.isArray(response)){
          res.status(200).json({
            message: 'Succesfully update cart data with product id '+response[1][0].id,
            body: response[1][0]
          })
        }else{
          res.status(201).json({
            message: 'Created new cart',
            body: response
          })
        }
      })
      .catch(next)
  }

  static getTransaction(req, res, next){
    Transaction
      .findAll({
        include: [User, Product],
        where :{
          UserId: req.params.user_id,
          status: 'unhandled'
        }
      })
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }

  static patchTransaction(req, res, next){
    const objValue = {
      qty: req.body.qty,
      total: req.body.total
    }

    Product
      .findByPk(req.params.product_id)
      .then(response => {
        if(objValue.qty <= response.stock){
          return Transaction
            .update(objValue, {
              where : {
                id: req.params.transaction_id
              },
              returning: true
            })
        }else{
          throw createError(400, { name: 'Nodata', message: 'Out of stock' })
        }
      })
      .then(response => {
        res.status(200).json(response[1][0])
      })
      .catch(next)

  }

  static deleteSingleTransaction(req, res, next){
    Transaction
      .destroy({
        where : {
          id: req.params.transaction_id
        }
      })
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }

  static checkoutTransaction(req, res, next){
    const cartData = req.body.cart
    let outStock = false

    
    cartData.map(el => {
      if(el.Product.stock < el.qty){
        outStock = true
      }
    })
    
    if(outStock){
      res.status(400).json('Out of stock')
    }else{
      const value = {
          status: 'checkout'
        }
        const checkoutProduct = Transaction.update(value, { where : { UserId: req.params.user_id, status: 'unhandled' } })
        const arrPromise = []
      
      cartData.map(el => {
        console.log('masuk sini')
        let stock = {
          stock : el.Product.stock - el.qty
        }

        let StockUpdate = Product.update(stock, { where : { id : el.Product.id } })
        arrPromise.push(StockUpdate)
      })

      arrPromise.push(checkoutProduct)

      Promise.all(arrPromise)
      .then(response => {
        res.status(200).json('Success checkout')
      })
      .catch(next)
    }
  }
  
}

module.exports = TransactionController