"use strict"

const { Product, User } = require('../models')

class ProductController {
    static create(req, res, next) {
        const body = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            category: req.body.category,
            UserId: req.userId
        }
        console.log(body)
        Product.create(body)
            .then(product => {
                res.status(201).json(product)
            })
            .catch(next)
    }

    static update(req, res, next) {
        const body = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            UserId: req.userId
        }
        console.log(body)
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

                if (product < 1) {
                    next({ message: 'product not found' })
                } else {
                    return User.findByPk(req.userId)
                }
            })
            .then(user => {
                let filter = user.dataValues.cart.filter(el => {
                    return el.id != req.params.id
                })

                return User.update({ cart: filter }, { where: { id: req.userId } })

            })
            .then(user => {

                res.status(200).json(user)
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

    static addOneCart(req, res, next) {
        const body = {
            id: req.body.id,
            name: req.body.name,
            image_url: req.body.image_url,
            price: Number(req.body.price),
            stock: Number(req.body.cartStock)
        }
        console.log(body)

        const obj = {}

        User.findByPk(req.userId)
            .then(user => {
                let test = []
                let arr = []
                if (user.dataValues.cart) {
                    arr = user.dataValues.cart.filter(el => {
                        if (el.id === req.body.id) {
                            el.stock += req.body.cartStock
                            test.push(1)
                        }
                        return el
                    })
                }
                if (test.length === 0) {
                    arr.push(body)
                    obj.cart = arr
                } else {
                    obj.cart = arr
                }
                return Product.findByPk(req.body.id)

            })
            .then(product => {
                let productStock = product.dataValues.stock
                if (req.body.product > productStock) {
                    next({ message: `Cannot pass the stock limit` })
                } else {
                    return User.update(obj, { where: { id: req.userId } })
                }
            })
            .then((product) => {
                res.status(200).json(product)
            })
            .catch(next)

    }



    static addCart(req, res, next) {
        const body = {
            id: req.body.id,
            name: req.body.name,
            image_url: req.body.image_url,
            price: Number(req.body.price),
            stock: Number(req.body.cartStock)
        }

        console.log(body)
        const obj = {}

        User.findByPk(req.userId)
            .then(user => {
                let test = []
                let arr = user.dataValues.cart.filter(el => {
                    if (el.id === req.body.id) {
                        el.stock = req.body.cartStock
                        test.push(1)
                    }
                    return el
                })
                if (test.length === 0) {
                    arr.push(body)
                    obj.cart = arr
                } else {
                    obj.cart = arr
                }
                return Product.findByPk(req.body.id)

            })
            .then(product => {
                let productStock = product.dataValues.stock
                if (req.body.product > productStock) {
                    next({ message: `Cannot pass the stock limit` })
                } else {
                    return User.update(obj, { where: { id: req.userId } })
                }
            })
            .then((product) => {
                res.status(200).json(product)
            })
            .catch(next)

    }

    static getCart(req, res, next) {
        User.findByPk(req.userId)
            .then(cart => {
                console.log(cart.dataValues.cart, 'okkkkkkkk')
                res.status(201).json(cart.dataValues.cart)
            })
            .catch(next)
    }

    static deleteOneCart(req, res, next) {
        User.findByPk(req.userId)
            .then(user => {
                let temp = user.dataValues.cart.filter(el => {
                    return el.id != req.params.id
                })
                console.log(req.params.id)
                return User.update({ cart: temp }, {
                    where: { id: req.userId }
                })
            })
            .then((user) => {
                res.status(200).json(user)
            })
            .catch(next)
    }


    static checkOut(req, res, next) {
        User.findByPk(req.userId)
            .then(user => {
                let temp = user.dataValues.cart.filter(el => {
                    console.log(el.id)
                    console.log(req.params.id)
                    return el.id != Number(req.params.id)
                })
                console.log(temp)
                return User.update({ cart: temp }, {
                    where: { id: req.userId }
                })
            })
            .then(user => {
                return Product.update({ stock: req.body.product }, {
                    where: {
                        id: req.body.id
                    }
                })
            })
            .then((user) => {
                res.status(200).json(user)
            })
            .catch(next)
    }
}

module.exports = ProductController