const { Product } = require('../database/models/index')

class ProductController {
    static getProducts(req, res, next) {
        Product
            .findAll()
            .then(products => {
                if (products.length !== 0) {
                    res.status(200).json(products)
                } else {
                    res.status(200).json({ message: 'No product available yet' })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    static postProduct(req, res, next) {
        const value = {
            name: req.body.name,
            price: Number(req.body.price),
            img_url: req.body.img_url,
            stock: Number(req.body.stock),
            CategoryId: req.body.categoryId
        }
        // console.log(value)
        Product
            .create(value)
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                console.log(err)
            })
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
            }
        }
        Product
            .update(value, options)
            .then(product => {
                console.log(product)
                res.status(200).json(product)
            })
            .catch(err => {
                console.log(err)
            })
    }
    static deleteProduct(req, res, next) {
        const options = {
            where: {
                id: req.params.id
            }
        }
        Product
            .destroy(options)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = ProductController