"use strict"

const { Product } = require('../models')

class ProductController {
    static create(req, res, next) {
        const body = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            UserId: req.userId
        }
        Product.create(body)
            .then(product => {
                res.status(201).json(product)
            })
            .catch(next)
    }

    static update(req, res, next) {
        console.log(req.body)
        const body = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            UserId: req.userId
        }
        Product.update(body, {
            where: { id: req.params.id }, returning: true,
            plain: true
        })
            .then(product => {
                res.status(201).json(product)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        Product.findByPk(req.params.id)
            .then(product => {
                console.log(product)
                if (product.length < 1) {
                    next({ message: 'product not found' })
                } else {
                    res.status(200).json(product)
                }
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Product.destroy({ where: { id: req.params.id } })
            .then(product => {
                console.log(product)
                if (product.length < 1) {
                    next({ message: 'product not found' })
                } else {
                    res.status(200).json(product)
                }
            })
            .catch(next)
    }


    static find(req, res, next) {
        Product.findAll()
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }
}

module.exports = ProductController