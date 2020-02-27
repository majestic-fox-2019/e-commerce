'use strict'

const { Cart, Product, User, History } = require('../models')

class CartController {
    static showUserCart(req, res, next) {
        User
            .findOne({
                where: {
                    id: req.user.id
                },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Cart,
                    attributes: {
                        include: ['id']
                    },
                    include: [{
                        model: Product
                    }]
                }],
                order: [
                    ['updatedAt', 'DESC'],
                ],
            })
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(next)
    }

    static addCart(req, res, next) {
        let { ProductId } = req.body
        let UserId = req.user.id

        let status

        Cart
            .findOne({
                where: {
                    ProductId,
                    UserId
                }
            })
            .then(data => {
                if (data) {
                    status = 200

                    return data.update({
                        amount: data.amount + 1,
                    })
                } else {
                    status = 201
                    return Cart.create({
                        UserId,
                        ProductId
                    })
                }
            })
            .then(data => {
                res.status(status).json(data)
            })
            .catch(next)
    }

    static deleteCart(req, res, next) {
        let data = null

        Cart
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(deleted => {
                data = deleted.data

                deleted.destroy({})
            })
            .then(del => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static changeQty(req, res, next) {
        Cart
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(data => {
                return data.update({
                    amount: req.body.num,
                })
            })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(next)
    }

    static proceedPayment(req, res, next) {
        Cart
            .findAll({
                include: [Product],
                where: {
                    UserId: req.user.id,
                }
            })
            .then(res => {
                let outOfStock = {
                    message: []
                }

                for (let i = 0; i < res.length; i++) {
                    if (res[i].amount > res[i].Product.stock) {
                        let temp = {
                            id: res[i].Product.id,
                            name: res[i].Product.name,
                            stock: res[i].Product.stock
                        }
                        outOfStock.message.push(temp)
                    }
                }
                if (outOfStock.message.length > 0) {
                    throw outOfStock
                } else {
                    return res
                }
            })
            .then(res => {
                let promise = []
                let transaction = {
                    UserId: req.user.id,
                    product: [],
                    totalQty: 0,
                    totalPrice: 0
                }

                for (let i = 0; i < res.length; i++) {
                    promise.push(res[i].Product.update({
                        stock: res[i].Product.stock - res[i].amount
                    }))

                    transaction.product.push({
                        name: res[i].Product.name,
                        qty: res[i].amount,
                        price: res[i].Product.price,
                        subTotal: res[i].amount * res[i].Product.price
                    })

                    transaction.totalPrice += res[i].amount * res[i].Product.price
                    transaction.totalQty += res[i].amount

                    promise.push(Cart.destroy({
                        where: {
                            UserId: req.user.id,
                        }
                    }))
                }

                promise.push(History.create(transaction))

                return Promise.all(promise)
            })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(next)
    }
}

module.exports = CartController