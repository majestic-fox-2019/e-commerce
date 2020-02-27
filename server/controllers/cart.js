const { Cart, Product} = require('../models')
const createError = require('http-errors')
const { Op } = require("sequelize");
class CartController{
  static addCart(req,res,next){
    const { ProductId } = req.body
    const UserId = req.user.id
    let name = ''
    Product
      .findByPk(ProductId)
      .then(product => {
        if(product.stock < 1){
          throw createError(400,"Product out of stock")
        }else{
          name = product.name
          return Cart
          .findOne({
            where: {
              status:null,
              UserId,
              ProductId
            }
          })
        }
      })
      .then(cart => {
        if(cart){
          return cart.update({
            amount: cart.amount + 1
          })
        }else{
          return Cart.create({
            UserId,
            ProductId,
            amount: 1
          })
        }
      })
      .then(cart => {
        cart.setDataValue('name',name)
        res.status(200).json(cart)
      })
      .catch(next)
  }

  static activeCart(req,res,next){
    const UserId = req.user.id
    Cart
      .findAll({
        attributes:{
          include:['id']
        },
        where: {
          UserId,
          status:null
        },
        order: [['id', 'ASC']],
        include:[{
          model: Product
        }]
      })
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(next)
  }

  static updateAmount(req,res,next){
    const { amount } = req.body
    const id = req.params.id
    Cart
      .findOne({
        where: {
          id
        }
      })
      .then(cart => {
        return cart.update({
          amount
        })
      })
      .then(cart => {
        console.log(cart)
        res.status(200).json(cart)
      })
      .catch(next)
  }

  static delete(req,res,next){
    const id = req.params.id
    let deleted = ''
    Cart
      .findOne({
        where: {
          id
        }
      })
      .then(cart => {
        deleted = cart
        return cart.destroy()
      })
      .then(cart => {
        res.status(200).json(deleted)
      })
      .catch(next)
  }

  static checkout(req,res,next){
    const UserId = req.user.id
    let status = 1
    Cart.findOne({
      attributes: ['status'],
      where: {
        UserId,
        status:{
          [Op.not]:null
        },
      },
      group:['status','UserId'],
      order: [['status', 'DESC']],
    }).then(data => {
      if(data){
        status += data.status
      }
      return Cart
        .findAll({
          attributes:{
            include:['id']
          },
          where: {
            UserId,
            status:null
          },
          order: [['id', 'ASC']],
          include:[{
            model: Product
          }]
        })
      })
      .then(cart => {
        let result = {}
        for (let i = 0; i < cart.length; i++){
          if(cart[i].amount > cart[i].Product.stock){
            result[cart[i].id] = 'Item out of stock'
          }
        }
        if(Object.keys(result).length > 0){
          throw {message:result,status:400}
        }else{
          return cart
        }
      })
      .then(cart => {
        let promise = []
        for (let i = 0; i < cart.length; i++){
          promise.push(cart[i].Product.update({
            stock: cart[i].Product.stock - cart[i].amount
          }))
          
        }
        promise
            .push(Cart
                    .update({status},{
                              where: {
                                UserId,
                                status:null
                              }
                            }))
        return Promise.all(promise)
      })
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(next)
  }

  static history(req,res,next){
    const UserId = req.user.id
    Cart
      .findAll({
        where: {
          UserId,
          status:{
            [Op.not]: null
          },
        },
        include:[{
          model: Product
        }]
      })
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(next)
  }

}

module.exports = CartController