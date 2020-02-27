const {Category,Product} = require('../models')
const createError = require('http-errors')
class CategoryController{
  static create(req,res,next){
    const {name} = req.body
    Category
      .create({
        name,
      })
      .then(category => {
        req.io.emit('category')
        res.status(201).json(category)
      })
      .catch(next)
  }

  static findAll(req,res,next){
    Category
      .findAll()
      .then(category => {
        res.status(200).json(category)
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

  static delete(req,res,next){
    let deleted = null
    Category
      .findByPk(req.params.id,{
        include:[{
          model: Product
        }]
      })
      .then(category => {
        if(category){
          deleted = category
          return category
        }else{
          throw createError(400,"category not found")
        }
      })
      .then(category => {
        if(category.Products.length === 0){
          return category.destroy()
        }else{
          throw createError(400,"category still have products")
        }
      })
      .then(result => {
        req.io.emit('category')
        res.status(200).json(deleted)
      })
      .catch(next)
  }
}

module.exports = CategoryController