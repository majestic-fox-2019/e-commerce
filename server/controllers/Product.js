"use strict"

const { Product } = require('../models')
const createError = require("http-errors")

class ProductController {
    static getAll(req, res, next) {
        Product.findAll()
            .then((product) => {
                res.status(200).json(product)
            })
            .catch(next);
    }
    static getOne(req, res, next) {
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((product) => {
                if (!product) {
                    throw (createError(404, "Not found product"))
                } else {
                    res.status(200).json(product)
                }
            }).catch(next);
    }
    static create(req, res, next) {
        const { name, description, image_url, price, stock, category } = req.body
        Product.create({
            name,
            description,
            image_url,
            price,
            stock,
            category
        })
            .then((product) => {
                res.status(201).json(product)
            }).catch(next);
    }
    static update(req, res, next) {
        const { name, description, image_url, price, stock, category } = req.body
        Product.update({
            name,
            description,
            image_url,
            price,
            stock,
            category,
            updatedAt: new Date()
        }, {
            where: {
                id: req.params.id
            }
        })
            .then((product) => {
                if (!product[0]) {
                    throw (createError(404, "Not found product"))
                } else {
                    return Product.findOne({
                        where: {
                            id: req.params.id
                        }
                    })
                        .then((product) => {
                            res.status(200).json(product)
                        })
                }
            }).catch(next);
    }
    static remove(req, res, next) {
        let result = null
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((product) => {
                result = product
                if (!product) {
                    throw (createError(404, "Not found product"))
                } else {
                    return Product.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(() => {
                            res.status(200).json(result)
                        })
                }
            }).catch(next);
    }
}

module.exports = ProductController