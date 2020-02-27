const {Cart, Product, History} = require('../models')

class CartController{
  static getCart(req,res,next) {
    Cart.findAll({
      where: {
        UserId: req.user.id
      },
      include: [Product],
      order: [
        ['id', 'ASC'],
      ],
    })
      .then(cart=>{
        res.status(200).json(cart)
      })
      .catch(error=>{
        next(error)
      })
  }

  static updateCart(req,res,next) {
    let stock
    Product.findOne({
      where: {
        id: req.body.ProductId
      }
    })
      .then(product=>{
        stock = product.dataValues.stock
        if(req.body.action == "plus") {
          if(product.dataValues.stock >= req.body.amount+1) {
            return Cart.update({amount: req.body.amount+1},{
              where: {
                ProductId: req.body.ProductId,
                UserId: req.user.id
              }
            })
          }else {
            throw {
              status: 400,
              message: `product out of stock, current stock is ${stock}`
            }
          }
        }else if (req.body.action == "set") {
          if(product.dataValues.stock >= req.body.amount) {
            return Cart.update({amount: req.body.amount},{
              where: {
                ProductId: req.body.ProductId,
                UserId: req.user.id
              }
            })
          }else {
            throw {
              status: 400,
              message: `product out of stock, current stock is ${stock}`
            }
          }
        }else if(action == "minus"){
          return Cart.update({amount: req.body.amount-1},{
            where: {
              ProductId: req.body.ProductId,
              UserId: req.user.id
            }
          })
        }
      })
      .then(updated=>{
        res.status(200).json(updated)
      })
      .catch(error=>{
        next(error)
      })
  }

  static addCart(req,res,next) {
    let obj = {
      UserId: req.user.id,
      ProductId: req.body.ProductId,
      amount: 1,
    }
    Product.findOne({
      where: {
        id: req.body.ProductId
      }
    })
      .then(cart=>{
        return Cart.create(obj)
      })
      .then(updated=>{
        res.status(201).json(updated)
      })
      .catch(error=>{
        next(error)
      })
  }

  static deleteCart(req,res,next) {
    Cart.destroy({
      where: {
        UserId: req.user.id,
        ProductId: req.body.ProductId
      }
    })
      .then(deleted=>{
        res.status(200).json(deleted)
      })
      .catch(error=>{
        next(error)
      })
  }

  static payment(req,res,next) {
    Cart.findAll({
      where: {
        UserId: req.user.id,   
      },
      include: [Product]
    })  
      .then(products=>{
        let update = []
        let message = []        
        for(let i = 0; i < products.length; i++) {
          console.log(products[i].dataValues.Product.id)
          let stock = products[i].dataValues.Product.stock
          let name = products[i].dataValues.Product.name
          let id = products[i].dataValues.Product.id
          if(products[i].dataValues.Product.stock >= products[i].dataValues.amount) {
            update.push(Product.update({
              stock: products[i].dataValues.Product.stock - products[i].dataValues.amount
            },{where:{id}}))
          }else {
            message.push(`remaining product stock of ${name} is ${stock}`)
          }
        }
        if(message.length > 0) {
          throw {
            status: 400,
            message
          }
        }else {
          return Promise.all(update)
        }
      })
      .then(updated=>{
        return  Cart.findAll({
          where: {
            UserId: req.user.id,   
          },
          include: [Product]
        })  
      })
      .then(cart=>{
        let items = []
        let totalitems = 0
        let totalprice = 0
        for(let i = 0; i < cart.length; i++) {
          items.push({
            name: cart[i].dataValues.Product.name,
            price: cart[i].dataValues.Product.price,
            quantity: cart[i].amount,
            totalprice: cart[i].amount * cart[i].dataValues.Product.price
          })
          totalitems += cart[i].amount
          totalprice += cart[i].amount * cart[i].dataValues.Product.price
        }
        let obj = {
          email: req.user.email,
          items,
          totalquantity: totalitems,
          totalprice
        }
        return History.create(obj)
      })
      .then(history=>{
        return Cart.destroy({
          where: {
            UserId: req.user.id,
          }
        })
      })
      .then(destroyed=>{
        res.status(200).json(destroyed)
      })
      .catch(error=>{
        next(error)
      })
  }
}

module.exports = CartController