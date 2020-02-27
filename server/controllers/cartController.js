const { Cart, Product } = require('../models')
const createError = require('http-errors')

class CartController {

  static postCart(req,res,next){
    let data = {
      ProductId: req.body.ProductId,
      UserId: req.user.id,
      quantity: req.body.quantity
    }
    console.log(data)
    Cart
      .findOne({
        where:{ ProductId: data.ProductId }
      })
      .then(avail=>{
        console.log(avail)
        if(avail){
          Cart
          .update(
            { quantity: data.quantity+avail.quantity },
            { where: { ProductId: data.ProductId}
            })
            .then(result => {
              res.status(201).json(result)
            })
            .catch(err=>{
              next(err)
            })
        }else {
          Cart
          .create(data)
          .then(result =>{
            res.status(201).json(result)
          })
          .catch(err=>{
            next(err)
          })
        }
      })
    .catch(err=>{
      next(err)
    })
  }

  static editQty(req,res,next){
    let data = {
      ProductId: req.body.ProductId,
      UserId: req.user.id,
      quantity: req.body.quantity
    }
    console.log(data)
    Cart
    .update(data,{
      where: { id: req.params.id },
      returning: true
    })
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err=>{
      next(err)
    })
  }

  static deleteOneCart(req,res,next){
    Cart
    .destroy({
      where: { ProductId : req.params.id }
    })
    .then(result => {
      res.status(201).json(result)
    })
  }

  static getCart(req,res,next){
    Cart
    .findAll({
      where: {UserId: req.user.id},
      include: [Product],
      order: [['createdAt','ASC']]
    })
    .then(result => {
      res.status(201).json(result)
    })
  }

  static checkout(req,res,next){
    console.log(req.user.id)
    let data = req.body
    let dataCart = []
      data.forEach(el => {
        let stockResult = el.Product.stock - el.quantity
        if(stockResult < 0){
          throw createError(404,'forbidden')
        } else {
          dataCart.push({
            UserId: el.UserId,
            ProductId: el.ProductId,
            stockNow: stockResult
          })
        }
      })
      let objUpdate =[]
        dataCart.forEach(item =>{
        objUpdate.push(
          Product
          .update(
            {stock: item.stockNow},
            {where: {id: item.ProductId}}
          ))
        })
          Promise.all(objUpdate)
          .then(result=>{
            console.log(result)
            console.log(req.user.id)
            Cart
            .destroy({where: {
               UserId: req.user.id 
             }})
            .then(result=>{
               res.status(201).json(result)
            })
          })
          .catch(err => {
            next(err)
          })
    
  }

}

module.exports = CartController