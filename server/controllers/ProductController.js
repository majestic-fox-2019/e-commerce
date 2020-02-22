const { Product, Category } = require('../models')

class ProductController {
  static getProductAll(req, res, next){
    Product.findAll({
      include: [{
        model: Category,
      }],
      order: [['id', 'ASC']]
    })
    .then(products => {
      res.status(200).json({
        code: 200,
        message: 'Get product list successfull',
        payload: products
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static createProduct(req, res, next){
    let objProduct = {
      name: req.body.name,
      image: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      CategoryId: req.body.CategoryId
    }
    Product.create(objProduct)
    .then(newproduct => {
      res.status(201).json({
        code: 201,
        message: "Create product successfull",
        payload: newproduct
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static getDetailProduct(req, res, next){
    const id_product = req.params.id
    Product.findByPk(id_product)
    .then(product => {
      if(product){
        res.status(200).json({
          code: 200,
          message: 'Get detail product successfull',
          payload: product
        })
      }else{
        throw {
          statusCode: 404,
          message: "Product not found"
        }
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static updateProduct(req, res, next){
    const updateDataProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      CategoryId: req.body.CategoryId
    }

    const id_product = Number(req.params.id)
    
    Product.findByPk(id_product)
    .then(product => {
      if(product){
        return product.update(updateDataProduct, { returning : true })
      }else{
        throw {
          statusCode: 404,
          message: "Product not found"
        }
      }
    })
    .then(result => {
      res.status(200).json({
        code: 200,
        message: 'Update product successfull',
        payload: result
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteProduct(req, res, next){
    const id_product = Number(req.params.id)
    let dataDelete
    Product.findByPk(id_product)
    .then(product => {
      if(product){
        dataDelete = product
        return product.destroy()
      }else{
        throw{
          statusCode: 404,
          message: "Product not found"
        }
      }
    })
    .then(() => {
      res.status(200).json({
        code: 200,
        message: 'Delete product successfull',
        payload: dataDelete
      })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = ProductController