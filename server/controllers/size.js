'use strict'

const { Size, Product } = require('../models')

class SizeController {
    static create ( req, res, next ) {
        Size.create({
            name: req.body.name
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(next)
    }
    static getAll ( req, res, next ) {
        Size.findAll({},{
            include: [{
                model: Product,
                attributes: ['name']
            }]
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = SizeController