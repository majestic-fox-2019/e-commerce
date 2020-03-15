"use strict"

const { Product, Size, Category } = require("../models")

class productController {
    static create (req, res, next) {
        Product.create({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            SizeId: req.body.size,
            CategoryId: req.body.category
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(next)
    }

    static getAll (req, res, next) {
        Product.findAll({
            include: [
                {
                    model: Size,
                    attributes: ['name']
                },
                {
                    model: Category,
                    attributes: ['name']
                }
            ]
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static getOne (req, res, next) {
        Product.findOne({
            where:{
                id: req.params.id
            },
            include: [
                {
                    model: Size,
                    attributes: ['name']
                },
                {
                    model: Category,
                    attributes: ['name']
                }
            ]
        })
        
        .then(result => {
            if(!result){
                throw {code: 404, message: "item not found"}
            }
            res.status(200).json(result)
        })
        .catch(next)
    }

    static update (req, res, next) {
        Product.update(
            {
                name: req.body.name,
                image_url: req.body.image,
                price: req.body.price,
                stock: req.body.stock
            },
            {
                where: {
                    id: req.params.id
                },
                returning: true,
                plain: true
            }
        )
        .then(result => {
            res.status(200).json(result[1])
        })
        .catch(next)
    }

    static delete (req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(result => {
            res.status(200).json(result)
        })
    }
}

module.exports = productController