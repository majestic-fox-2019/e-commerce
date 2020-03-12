'use strict'

const { Category } = require('../models')

class CategoryController {
    static create ( req, res, next ) {
        Category.create({
            name: req.body.name
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(next)
    }
    static getAll ( req, res, next ) {
        Category.getAll()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports=CategoryController