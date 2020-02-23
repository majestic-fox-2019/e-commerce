const { Product } = require('../database/models/index')
const createError = require('http-errors')

class ProductController {
    static getProducts(req, res, next) {
        Product
            .findAll()
            .then(products => {
                if (products.length !== 0) {
                    res.status(200).json(products )
                } else {
                    res.status(200).json({ message: 'No product available yet' })
                }
            })
            .catch(next)
    }
    static postProduct(req, res, next) {
        const value = {
            name: req.body.name,
            price: Number(req.body.price),
            img_url: req.body.img_url,
            stock: Number(req.body.stock),
            CategoryId: req.body.categoryId
        }
        Product
            .create(value)
            .then(product => {
                res.status(201).json({ message: 'Successfully added a product', data: product })
            })
            .catch(next)
    }
    static putProduct(req, res, next) {
        const value = {
            name: req.body.name,
            price: Number(req.body.price),
            img_url: req.body.img_url,
            stock: Number(req.body.stock),
            CategoryId: req.body.categoryId
        }
        const options = {
            where: {
                id: req.params.id
            },
        }
        Product
            .update(value, options)
            .then(result => {
                if (result[0] !== 0) {
                    res.status(200).json({ message: 'Successfully updated product' })
                } else {
                    next(createError(404, 'Product not found'))
                }
            })
            .catch(next)
    }
    static deleteProduct(req, res, next) {
        const options = {
            where: {
                id: req.params.id
            }
        }
        Product
            .destroy(options)
            .then(result => {
                if (result != 0) {
                    res.status(200).json({ message: 'Successfully deleted product' })
                } else {
                    next(createError(404, 'Product not found'))
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = ProductController