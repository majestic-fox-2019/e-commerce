const { Product } = require('../models')

class ProductController {
    static create(req, res, next) {
        const { name, image_url, price, stock, category, description } = req.body
        Product.create({
            name,
            image_url,
            price,
            stock,
            category,
            description
        })
        .then(product => {
            res.status(201).json(product)
        })
        .catch(next)
    }

    static readAll(req, res, next) {
        const categoryFilter = req.params.category
        if(categoryFilter === undefined || categoryFilter === 'all') {
            Product.findAll({})
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
        } else {
            Product.findAll({
                where: {
                    category: categoryFilter
                }
            })
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
        }
    }

    static readOne(req, res, next) {
        const id = req.params.id
        Product.findByPk(id)
        .then(product => {
            res.status(200).json(product)
        })
        .catch(next)
    }

    static update(req, res, next) {
        const id = req.params.id
        const { name, image_url, price, stock, category, description } = req.body
        Product.update(
            {
                name,
                image_url,
                price,
                stock,    
                category,
                description
            },
            {
                where: {
                    id
                }
            }
        )
        .then(product => {
            res.status(200).json(product)
        })
        .catch(next)
    }

    static delete(req, res, next) {
        const id = req.params.id

        Product.destroy({
            where: {
                id
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = ProductController