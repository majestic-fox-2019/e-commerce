const Product = require('../models').Product
const User = require('../models').User
const Cart = require('../models').Cart

class ControllerProduct{ 
  //ADMIN ONLY
  static createProduct(req, res, next) {
    let {name, stock, category, image_url, price, description} = req.body
    Product.create({name, stock, category, image_url, price, description})
    .then(data => {
      console.log(data, "<<<< ini post")
      res.status(201).json(data)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static deleteProduct(req, res, next) {
    let product
    Product.findOne({where: {id:req.params.id}})
    .then(data => {
      product = data
      return Product.destroy({where: {id: req.params.id}})
    })
    .then(data => {
      res.status(201).json(product)
    })
    .catch(err => {
      next(err)
    })
  }

  static updateProduct(req, res, next) {
    let {name, stock, category, image_url, price, description} = req.body
    Product.update({name, stock, category, image_url, price, description}, {where:{id:req.params.id}, returning: true})
    .then(product => {
      console.log(product)
      res.status(201).json(product[1])
    })
    .catch(err => {
      next(err)
    })
  }

  //USERSS
  static showProducts (req, res, next) {
    Product.findAll()
    .then(products => {
      res.status(201).json(products)
    })
    .catch(err => {
      next(err)
    })
  }

  static detailProduct(req, res, next) {
    let product
    Product.findOne({where:{id:req.params.id}})
    .then(data => {
      product = data
      res.status(201).json(product)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static addToCart(req, res, next) {
    let user
    let product   
    Product.findOne({where:{id:req.params.id}})  
    .then(data => {
      console.log(req.body)
      product = data
      if(product.stock - req.body.total < 0) {
        console.log("masuuuuuk siniiii")
        throw({code:400, message: "sorry we were out of stocks!"})
      } else {
        return Cart.findOne({where:{UserId:req.user, ProductId:product.id}})
      }
    })
    .then(data => {
      if(!data){
        return Cart.create({UserId:req.user, ProductId:product.id, total:req.body.total})
      } else {
        if(Number(req.body.total) + Number(data.total) > product.stock){
          throw({code:400, message: "sorry we were out of stocks!"})
        }else {
          let obj = {
            UserId:req.user, 
            ProductId:product.id, 
            total:Number(req.body.total) + Number(data.total)
          }
          return Cart.update(obj, {where:{UserId:req.user, ProductId:product.id}})
        }
      }
    })
    .then(data => {
      return User.findOne({include: [Product], where: {id: req.user}})
    })
    .then(data => {
      user = data
      res.status(201).json(user)
    })
    .catch(err => {
      next(err)
    })
  }

  static showCart(req, res, next) {
    let user
    if(!req.user){
      throw({code:400, message:"not login"})
    }
    User.findOne({
      where:{id:req.user}, 
      include: [ {
        model: Product
      }]
    })
    .then(data => {
      user = data
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static removeFrommCart(req, res, next) {
    let product
    let user
   User.findOne({include:[Product], where: {id: req.user}})
   .then(data => {
     user = data
     return Product.findOne({where:{id:req.params.id}})
   })
  .then(data => {
    product = data
    user.Products.forEach(el => {
     return Cart.destroy({where: {UserId:user.id, ProductId: product.id}})
    })
  })
  .then(data => {
    res.status(201).json(data)
  })
    .catch(err => {
      next(err)
    })
  }

  static updateFromCart(req, res, next) {
    let stock = req.body.total
    let product
    Product.findOne({where:{id:req.params.id}})
    .then(data => {
      product = data
      if(product.stock - stock < 0){
        throw({code: 400, message: "sorry, not avaible stock!"})
      } else {
        console.log("masukkk")
        let cartObj = {
          UserId: req.user,
          ProductId: req.params.id,
          total: stock
        }
        return Cart.update(cartObj, {where: {UserId:req.user, ProductId: product.id}})
      }
    })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static checkOut(req, res, next) {
    let user
    let product
    let cart
    User.findOne({include:[Product], where:{id:req.user}})
    .then(data => {
      user = data
      return Cart.findAll({where: {UserId:user.id}})
    })
    .then(data => {
      cart = data
      let allCheckout = []
      data.forEach(el => {
        allCheckout.push(Product.findOne({
            where: {
              id:el.ProductId
            }
          }))
      })
      return Promise.all(allCheckout)
    })
    .then(data => {
      console.log(data)
      let temp = []
      for(let i = 0; i< cart.length; i++){
        for(let j = 0; j < data.length; j++) {
          if(cart[i].ProductId == data[j].id) {
            let {name, stock, category, image_url, price, description} = data[j]
            stock = stock - cart[i].total
            temp.push(Product.update({name, stock, category, image_url, price, description}, {where: {id: data[j].id}}))
          }
        }
      }
      return Promise.all(temp)
    })
    .then(data => {
      return Cart.destroy({where: {UserId:user.id}})
    })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })

  }

  static categoriSplit(req, res, next) {
    Product.findAll({where:{category: req.params.category}})
    .then(products => {
      res.status(201).json(products)
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = ControllerProduct