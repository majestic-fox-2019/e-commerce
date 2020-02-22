const {Product,Category} = require('../models')
const createError = require('http-errors')
class ProductController{
  static create(req,res,next){
    const {name,image_url,price,stock,category} = req.body
    Category
      .findOne({
        where:{
          name: category
        }
      })
      .then(category => {
        if(category){
          return  Product
                    .create({
                      name,
                      price,
                      stock,
                      CategoryId : category.id
                    })
        }else{
          throw createError(400,"category not found")
        }
      })
      .then(product => {
        req.io.emit('products')
        res.status(201).json(product)
      })
      .catch(next)
  }

  static findAll(req,res,next){
    Product
      .findAll()
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static findCategory(req,res,next){
    console.log(req.params.id)
    Product
      .findAll({
        include: [{
          model: Category,
          where: {
            name: req.params.id
          }
        }]
      })
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static findByPk(req,res,next){
    Product
      .findByPk(req.params.id)
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static update(req,res,next){
    const {name,image_url,price,stock} = req.body
    Product
      .findByPk(req.params.id)
      .then(product => {
        if(product){
          return product.update({
            name,
            price,
            stock
          })
        }else{
          throw createError(400,"Product not found")
        }
      })
      .then(result => {
        req.io.emit('products')
        res.status(200).json(result)
      })
      .catch(next)
  }

  static updateByImage(req,res,next){
    const {image_url} = req.body
    Product
      .findByPk(req.params.id)
      .then(product => {
        if(product){
          return product.update({
            image_url
          })
        }else{
          throw createError(400,"Product not found")
        }
      })
      .then(result => {
        req.io.emit('products')
        res.status(200).json(result)
      })
      .catch(next)
  }

  static delete(req,res,next){
    let deleted = null
    Product
      .findByPk(req.params.id)
      .then(product => {
        if(product){
          deleted = product
          return product.destroy()
        }else{
          throw createError(400,"Product not found")
        }
      })
      .then(result => {
        req.io.emit('products')
        res.status(200).json(deleted)
      })
      .catch(next)
  }
}

module.exports = ProductController