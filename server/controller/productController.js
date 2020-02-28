const {Product, Category, Cart, User} = require('../models')
const Op = require('sequelize').Op

class ProductContoller{
  static adminListProduct(req,res,next){
    Product.findAll({
      include: [Category, User],
      order: [
        ['id', 'ASC'],
      ],
    })
    .then(products=>{
      console.log(products.length)
      res.status(200).json(products)
    })
    .catch(err=>{
      next(err)
    })
  }

  static listProduct(req,res,next){
    Product.findAll({
      include: [Category, User],
      order: [
        ['id', 'ASC'],
      ],
      where: {
        stock: {
          [Op.gt] : 0 
        }
      }
    })
    .then(products=>{
      res.status(200).json(products)
    })
    .catch(err=>{
      next(err)
    })
  }

  static filterProductAdmin(req,res,next){
    console.log(req.params)
    Category.findOne({
      where: {
        name: req.params.id
      }
    })
     .then(found=>{
      let find = {
        where: {
          CategoryId: found.dataValues.id,
        },
        include: [Category, User]
      }
       return Product.findAll(find)
     })
      .then(products=>{
        res.status(200).json(products)
      })
      .catch(err=>{
        next(err)
      })
  }

  static filterProduct(req,res,next){
    console.log(req.params)
    Category.findOne({
      where: {
        name: req.params.id
      }
    })
     .then(found=>{
        let find = {
          where: {
            CategoryId: found.id,
            stock: {
              [Op.gt] : 0 
            }
          },
          include: [Category, User]
        }
        console.log(find)
        return Product.findAll(find)
      })
      .then(products=>{
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
    Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(found=>{
        if(found) {
          return Product.destroy({
            where: {
              id: req.params.id
            }
          })
        }else {
          throw {
            status: 404,
            message: `product not found`
          }
        }
      })
    .then(product=>{
      res.status(200).json(product)
    })
    .catch(err=>{
      next(err)
    })
  }

  static banner(req,res,next) {
    Product.findAll({
      include: [Category, User],
      order: [
        ['createdAt', 'DESC'],
      ],
      where: {
        stock: {
          [Op.gt] : 0 
        }
      }
    })
    .then(products=>{
      let send = []
      for(let i = 0; i < products.length; i++) {
        if(products[i].dataValues.image_url !== null && products[i].dataValues.image_url !== ''){
          send.push({name:products[i].dataValues.name,img:products[i].dataValues.image_url})
        }
        if(send.length > 6) {
          break;
        }
      }
      res.status(200).json(send)
    })
    .catch(err=>{
      next(err)
    })
  }

  static updateProduct(req,res,next){
    let {name, CategoryId, image_url, price, stock} = req.body
    Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(found=>{
        if(found) {
          return Product.update(
            {
              name, CategoryId, image_url, price, stock
            },
            {
              where: {
                id: req.params.id
              },
              returning: true
            })
        }else {
          throw {
            status: 404,
            message: `product not found`
          }
        }
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