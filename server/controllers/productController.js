const { Product, Category } = require('../models')
const createError = require('http-errors')

class ProductController {
    static addItem(req, res, next) {
        const { name, image_url, price, stock, CategoryId } = req.body

        Product
            .create({
                name,
                image_url,
                price,
                stock,
                CategoryId
            })
            .then(item => {
                res.status(201).json(item)
            })
            .catch(next)
    }

    static listProduct(req, res, next) {
        let option = {
            name: req.params.category
        }

        if (req.params.category == 'undefined' || !req.params.category || req.params.category == 'all') {
            option = {}
        }

        Product
            .findAll({
                include: [{
                    model: Category,
                    where: option
                }],
                order: [
                    ['updatedAt', 'DESC'],
                ],
            })
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
    }

    static getProductById(req, res, next) {
        Product
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(product => {
                if (!product) {
                    throw createError(404, "Product not found")
                }
                res.status(200).json(product)
            })
            .catch(next)
    }

    static updateProduct(req, res, next) {
        let updateData = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            CategoryId: req.body.CategoryId
        }

        Product
            .findByPk(req.params.id)
            .then(product => {
                if (!product) {
                    throw createError(404, "Product not found")
                }

                return product.update(updateData, { returning: true })
            })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(next)
    }

    static deleteProduct(req, res, next) {
        let deletedData = null

        Product
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(data => {
                if (!data) {
                    throw createError(404, "Product not found")
                }
                deletedData = data

                return data.destroy()
            })
            .then(results => {
                res.status(200).json(deletedData)
            })
            .catch(next)
    }

    static showBanner(req, res, next) {
        Product
            .findAll({
                limit: 10,
                order: [['createdAt', 'DESC']]
            })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }
}

module.exports = ProductController