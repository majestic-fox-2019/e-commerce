"use strict"

const { Product } = require('../models')
const { User } = require('../models')
const { Cart } = require('../models')
const createError = require("http-errors")

class CartController {
    static addCart(req, res, next) {
        let stockProduct = null
        const { productId, qty } = req.body
        Product.findOne({
            where:
            {
                id: productId
            }
        })
            .then((product) => {
                stockProduct = product.stock
                if (stockProduct < qty) {
                    throw (createError(400, `product has only stock ${stockProduct}`))
                } else {
                    return Cart.findOne({
                        where: {
                            ProductId: productId,
                            UserId: req.user.id,
                            status: "in cart"
                        }
                    })
                }
            })
            .then((cart) => {
                if (!cart) {
                    return Cart.create({
                        ProductId: productId,
                        UserId: req.user.id,
                        qty
                    })
                } else {
                    if (stockProduct < (cart.qty += qty)) {
                        throw (createError(400, `your cart of product over limit`))
                    } else {
                        return Cart.increment({
                            qty
                        }, {
                            where: {
                                ProductId: productId,
                                UserId: req.user.id
                            }
                        })
                    }
                }
            })
            .then((cart) => {
                res.status(201).json(cart)
            }).catch(next);
    }
    static findCart(req, res, next) {
        Cart.findAll({
            where: {
                UserId: req.user.id,
                status: "in cart"
            },
            include: Product
        })
            .then((cart) => {
                res.status(200).json(cart)
            }).catch(next);
    }
    static findCartOnProcess(req, res, next) {
        Cart.findAll({
            where: {
                UserId: req.user.id,
            },
            include: Product
        })
            .then((cart) => {
                res.status(200).json(cart)
            }).catch(next);
    }
    static removeCart(req, res, next) {
        Cart.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((cart) => {
                res.status(200).json(cart)
            }).catch(next);
    }
    static updateCart(req, res, next) {
        let stockProduct = null
        const { productId, qty } = req.body
        Product.findOne({
            where:
            {
                id: productId
            }
        })
            .then((product) => {
                stockProduct = product.stock
                if (stockProduct < qty) {
                    throw (createError(400, `product has only stock ${stockProduct}`))
                } else if (qty < 1) {
                    throw (createError(400, `minimal buy product 1`))
                } else {
                    return Cart.findOne({
                        where: {
                            id: req.params.id
                        }
                    })
                }
            })
            .then(() => {
                return Cart.update({
                    qty
                }, {
                    where: {
                        id: req.params.id
                    }
                })
            })
            .then((cart) => {
                res.status(201).json(cart)
            }).catch(next);
    }
    static checkoutCart(req, res, next) {
        const checkoutCart = []
        let stockProduct = null
        req.body.cartCheckout.forEach(el => {
            stockProduct = el.Product.stock - el.qty
            checkoutCart.push(Cart.update({
                status: "Process"
            }, {
                where: {
                    id: el.id
                }
            }))
            checkoutCart.push(Product.update({
                stock: stockProduct
            }, {
                where: {
                    id: el.Product.id
                }
            }))
        });
        Promise.all(checkoutCart)
            .then(() => {
                res.status(200).json("Success Checkout")
            }).catch(next);
    }
    static completeCheckout(req, res, next) {
        Cart.update({
            status: "Completed"
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.status(200).json("Success Transaction")
            }).catch(next);
    }
}

module.exports = CartController