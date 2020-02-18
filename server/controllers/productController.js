const { Product } = require('../models')
const { Op } = require('sequelize')

class ProductController {
    static addProduct(req, res, next) {
        let {
            name,
            desc,
            price,
            stock,
            img_url,
            category
        } = req.body
        Product.create({
            name,
            desc,
            price,
            stock,
            img_url,
            category,
            UserId: req.loggedUser.id,
            official: req.body.admin || false
        })
        .then(newProduct => {
            res.status(201).json(newProduct)
        })
        .catch(err => {
            next(err)
        })
    }

    static findAllProducts(req, res, next) {
        Product.findAll({
            where: {
                stock: {
                    [Op.gt]: 0
                  }
            }
        })
        .then(allProducts => {
            res.status(200).json(allProducts)
        })
        .catch(err => {
            next(err)
        })
    }

    static findOneProduct(req, res, next) {
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(productData => {
            if(!productData){
                throw({
                    statusCode: 404,
                    message: 'Product not found'
                })
            } else {
                res.status(200).json(productData)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static findByCategory(req, res, next) {
        Product.findAll({
            where: {
                category: req.params.category,
                stock: {
                    [Op.gt]: 0
                  }
            }
        })
        .then(productsByCategory => {
            if(productsByCategory.length < 1){
                throw ({
                    statusCode: 404,
                    message: 'Category not found'
                })
            } else {
                res.status(200).json(productsByCategory)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static editProduct(req, res, next) {
        let {
            name,
            desc,
            price,
            stock,
            img_url,
            category
        } = req.body
        Product.update({
            name,
            desc,
            price,
            stock,
            img_url,
            category
        },{
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(editedProduct => {
            res.status(200).json(editedProduct[1][0].dataValues)
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteProduct(req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(deletedCount => {
            res.status(200).json(deletedCount)
        })
        .catch(err => {
            next(err)
        })
    }

    static editStock(req, res, next) {
        Product.update({
            stock: req.body.stock
        },{
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(editedProduct => {
            res.status(200).json(editedProduct[1][0].dataValues)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductController