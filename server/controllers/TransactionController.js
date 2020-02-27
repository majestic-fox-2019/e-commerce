"use strict"
const {Transaction, Product} = require('../models');
class TransactionController {
    static addToCart(req, res, next) {
        const {UserId, ProductId, price} = req.body;
        Transaction
          .create({UserId, ProductId, price})
          .then(() => {
              res.status(201).json("Sucess add product to cart");
          })
          .catch(err => {
              next(err);
          });
    }

    static listTransactionByUser(req, res, next) {
        Transaction
          .findAll({
              where: {
                  UserId: req.params.UserId,
                  isSettled: null
              },
              include: [ "Product" ]
          })
          .then(transactions => {
            res.status(200).json(transactions);
          })
          .catch(err => {
              next(err);
          });
    }

    static getTotalByUser(req, res, next) {
        Transaction
            .findAll({
                where: {
                    UserId: req.params.UserId,
                    isSettled: null
                }
            })
            .then(transactions => {
                res.status(200).json(transactions.length);
            })
            .catch(err => {
                next(err);
            });
    }

    static settledTransactionsByUser(req, res, next) {
        // Kurangi stock product
        const carts = req.body.carts;
        carts.forEach(cart => {
            Product
                .update({
                    stock: cart.Product.stock - 1
                }, {
                    where: {
                        id: cart.ProductId
                    }
                });
        });

        Transaction
            .update({isSettled: true}, {
                where: {
                    UserId: req.params.UserId,
                    isSettled: null
                }
            })
            .then(() => {
                res.status(200).json("Products has been settled");
            })
            .catch(err => {
                next(err);
            });
    }
}

module.exports = TransactionController;