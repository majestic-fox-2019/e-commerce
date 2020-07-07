const { Cart, User, Product, Transaction } = require('../models')

class CartController {
    static create(req, res, next) {
        const { ProductId, quantity, price } = req.body
        const UserId = req.userLoggedIn.id
        let stock = 0
        Cart.findAll(
            {
                where: {
                    ProductId,
                    UserId
                }
            }
        )
        .then(carts => {
            if(carts.length === 0) {
                return Cart.create({
                    ProductId,
                    UserId,
                    quantity: Number(quantity),
                    price: Number(price)
                })
                .then(resCreate => {
                    res.status(201).json(resCreate)
                })
            } else {
                return Product.findOne({
                    where: {
                        id: ProductId
                    }
                })
                .then(product => {
                    stock = product.stock
                    if(carts[0].dataValues.quantity+1 > stock) {
                        throw new Error(`Quantity cannot greater than Stock ${stock}`)
                    } else {
                        return Cart.increment('quantity',
                            {
                                where: {
                                    ProductId,
                                    UserId
                                }
                            }
                        )
                        .then(resUpdate => {
                            res.status(200).json(resUpdate)
                        })
                    }
                })
            }
        })
        .catch(next)
    }

    static deleteMany(req, res, next) {
        const UserId = req.userLoggedIn.id
        Cart.destroy(
            {
                where: {
                    UserId
                }
            }
        )
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static deleteOne(req, res, next) {
        const id = req.params.id
        Cart.destroy(
            {
                where: {
                    id
                }
            }
        )
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static readAll(req, res, next) {
        const UserId = req.userLoggedIn.id
        Cart.findAll(
            {
                where: {
                    UserId
                },
                include: [User, Product],
                order: [
                    ['id', 'DESC'],
                ],
            }
        )
        .then(carts => {
            res.status(200).json(carts)
        })
        .catch(next)
    }

    static updateQtyCart(req, res, next) {
        const id = req.params.id
        const { quantity } = req.body
        Cart.update(
            {
                quantity
            },
            {
                where: {
                    id
                }
            }
        )
        .then(response => {
            res.status(200).json(response)
        })
        .catch(next)
    }

    static checkoutCart(req, res, next) {
        const UserId = req.userLoggedIn.id
        let isOk = true
        let errMsg = []
        let arrPromise = []
        Cart.findAll(
            {
                where: {
                    UserId
                },
                include: [User, Product],
                order: [
                    ['id', 'DESC'],
                ],
            }
        )
        .then(carts => {
            carts.forEach(element => {
                if(element.quantity > element.Product.stock) {
                    isOk = false
                    errMsg.push(`Qty ${element.Product.name} is greater than stock ${element.Product.stock}`)
                }
            })
            if(isOk) {
                carts.forEach(element => {
                    let stock = element.Product.stock - element.quantity
                    let updateStock = Product.update(
                        { stock },
                        { where: {
                                id: element.Product.id
                            }
                        })
                    let createTran = Transaction.create({
                        ProductId: element.Product.id,
                        UserId,
                        quantity: Number(element.quantity),
                        price: Number(element.price)
                    })
                    let deleteCart = Cart.destroy({
                        where: { id: element.id }
                    })
                    arrPromise.push(updateStock)
                    arrPromise.push(createTran)
                    arrPromise.push(deleteCart)
                })
                Promise.all(arrPromise)
                .then(result => {
                    res.status(200).json(result)
                    console.log(result)
                })
                .catch(error => {
                    console.log(error)
                    next(error)
                })
            } else {
                throw new Error(errMsg)
            }
        })
        .catch(next)

    }

}

module.exports = CartController