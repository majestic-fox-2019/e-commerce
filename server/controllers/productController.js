const  { Product, Category } = require('../models/index')
const { Op } = require('sequelize').Sequelize
const axios = require('axios')

class ProductController {

  static getAllProducts(req, res, next){
    const productName = req.query.name

    Product
      .findAll({
        include : {
          model : Category,
        },
        where : {
          name : {
            [Op.like] : `%${productName}%`
          }
        }
      })
      .then(response => {
        if(response.length > 0){
          res.status(200).json(response)
        }else{
          res.status(200).json({
            message : 'Product is empty!'
          })
        }
      })
      .catch(next)
  }

  static getProductById(req, res, next){
    Product
      .findOne({
        where : {
          id : req.params.product_id,
          status_product : 'published'
        },
        includes : {
          model : Category,
          required: false,
        }
      })
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }

  static createProducts(req, res, next){

    const objValue = {
      name : req.body.name,
      image_url : req.body.image_url,
      price : req.body.price,
      stock : req.body.stock,
      CategoryId : req.body.CategoryId,
      description : req.body.description,
      status_product : 'published'
    }

    Product
      .create(objValue)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }

  static updateStatusProduct(req, res, next){
    Product
      .findOne({
        where : {
          id : req.params.product_id
        }
      })
      .then(response => {
        let data = {
          status_product : response.status_product == 'published' ? 'unpublished' : 'published'
        }
        return Product.update(data, {
          where : {
            id : req.params.product_id
          },
          returning : true
        })
      })
      .then(response => {
        res.status(200).json(response[1][0])
      })
      .catch(next)
  }

  static updateProducts(req, res, next){
    const objValue = {
      name : req.body.name,
      image_url : req.body.image_url,
      price : req.body.price,
      stock : req.body.stock,
      CategoryId : req.body.CategoryId,
      description : req.body.description
    }

    Product
      .update(objValue, {
        where : {
          id : req.params.product_id
        },
        returning : true
      })
      .then(response => {
        res.status(200).json(response[1][0])
      })
      .catch(next)
  }

  static deleteProducts(req, res, next){
    let data = {}

    Product
      .findByPk(req.params.product_id)
      .then(response => {
        data = response
        return response.destroy()
      })
      .then(response => {
        res.status(200).json(data)
      })
      .catch(next)
  }

}

module.exports = ProductController