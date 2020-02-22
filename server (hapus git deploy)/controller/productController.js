const {Product, Category} = require('../models')
const Op = require('sequelize').Op

class ProductContoller{
  static listProduct(req,res,next){
    Product.findAll({
      include: [Category]
    })
    .then(products=>{
      res.status(200).json(products)
    })
    .catch(err=>{
      next(err)
    })
  }

  static filterProduct(req,res,next){
    let find
    if(Number(req.params.id) == 0) {
      find = {
        where: {
          CategoryId: {
            [Op.gt] : Number(req.params.id)
          }
        },
        include: [Category]
      }
    }else{
      find = {
        where: {
          CategoryId: req.params.id
        },
        include: [Category]
      }
    }
    Product.findAll(find)
    .then(products=>{
      console.log(products)
      res.status(200).json(products)
    })
    .catch(err=>{
      next(err)
    })
  }

  static addProduct(req,res,next){
    let {name, image_url, CategoryId, price, stock} = req.body
    Product.findOne({
      where: {
        name
      }
    })
      .then(avail=>{
        if(avail !== null) {
          throw {
            status: 400,
            message: `product name already exist`
          }
        }else{
          return Product.create({name, image_url, CategoryId,  price, stock})
        }
      })
      .then(product=>{
        res.status(201).json(product)
      })
      .catch(err=>{
        next(err)
      })
  }

  static deleteProduct(req,res,next){
    Product.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(product=>{
      res.status(200).json(product)
    })
    .catch(err=>{
      next(err)
    })
  }

  static updateProduct(req,res,next){
    let {name, CategoryId, image_url, price, stock} = req.body
    console.log(name, CategoryId, image_url, price, stock)
    Product.update(
      {
        name, CategoryId, image_url, price, stock
      },
      {
        where: {
          id: req.params.id
        },
        returning: true
      })
    .then(product=>{
      res.status(200).json(product)
    })
    .catch(err=>{
      next(err)
    })
  }
}

module.exports = ProductContoller