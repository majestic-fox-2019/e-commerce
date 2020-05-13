"use strict"

const { Product } = require('../models')
const { Transaction } = require('../models')

class TransactionController {
    static addTransaction(req, res, next) {
        const sub_total = (req.body.cart.qty * req.body.cart.Product.price)
        const quantity = req.body.cart.qty
        const user_id = req.body.cart.Product.UserId
        const product_id = req.body.cart.Product.id
        Transaction.create({
            UserId: user_id,
            ProductId: product_id,
            qty: quantity,
            subTotal: sub_total
        })
            .then((transaction) => {
                res.status(200).json(transaction)
            }).catch(next);
    }
    static findTransaction(req, res, next) {
        Transaction.findAll({
            where: {
                UserId: req.user.id,
            },
            include: Product
        })
            .then((transactions) => {
                res.status(200).json(transactions)
            }).catch(next);
    }
}
module.exports = TransactionController