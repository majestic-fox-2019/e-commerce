const { Cart, Product, User } = require('../database/models/index')
const createError = require('http-errors')

class CartController {
    static getCarts(req, res, next) {
        const options = {
            where: {
                id: req.loggedUserId
            },
            include: [Product]
        }
        User
            .findOne(options)
            .then(user => {
                let cart = user.Products
                if (cart.length !== 0) {
                    res.status(200).json(cart)
                } else {
                    res.status(200).json({ message: 'No Cart available yet' })
                }
            })
            .catch(next)
    }
    static postCart(req, res, next) {
        const value = {
            UserId: req.loggedUserId,
            ProductId: Number(req.body.productId),
            amount: Number(req.body.amount) || 1,
        }

        const options = {
            where: {
                UserId: req.loggedUserId,
                ProductId: Number(req.body.productId)
            }
        }
        Cart
            .findOne(options)
            .then(result => {
                if (result) {
                    return 'Product is already in our shopping cart'
                } else {
                    return Cart.create(value)
                }
            })
            .then(result => {
                console.log(result)
                if (typeof result === 'string') {
                    res.status(409).json({ message: result })
                } else {
                    res.status(201).json({ message: 'Successfully added a cart', data: result })
                }
            })
            .catch(next => console.log(next))
    }
    static putCart(req, res, next) {
        const value = {
            name: req.body.name,
            price: Number(req.body.price),
            img_url: req.body.img_url,
            stock: Number(req.body.stock),
            CategoryId: req.body.categoryId
        }
        const options = {
            where: {
                id: req.params.id
            },
        }
        Cart
            .update(value, options)
            .then(result => {
                if (result[0] !== 0) {
                    res.status(200).json({ message: 'Successfully updated Cart' })
                } else {
                    next(createError(404, 'Cart not found'))
                }
            })
            .catch(next)
    }
    static deleteCart(req, res, next) {
        const options = {
            where: {
                ProductId: Number(req.params.id),
                UserId: Number(req.loggedUserId)
            }
        }
        Cart
            .destroy(options)
            .then(result => {
                if (result != 0) {
                    res.status(200).json({ message: 'Successfully deleted Cart' })
                } else {
                    next(createError(404, 'Cart not found'))
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    static checkout(req, res, next) {
        // console.log(req.body)
        let temp = []
        Product
            .findAll()
            .then(products => {
                if (products.length > 0) {
                    return products
                }
            })
            .then(products => {
                products.forEach(product => {
                    req.body.value.forEach(val => {
                        if (product.id === val.id) {
                            val.qty = product.stock - val.qty
                            temp.push(val)
                        }
                    });
                });
                const updateAllProduct = []
                temp.forEach(el => {
                    updateAllProduct.push(
                        Product
                            .update({ stock: el.qty }, { where: { id: el.id } })
                    )
                });
                return Promise.all(updateAllProduct)
            })
            .then(result => {
                res.status(200).json({ message: 'Successfully updated product stock' })
            })
            .catch(err => {
                console.log(err)
                next(err)
            })

    }
}

module.exports = CartController