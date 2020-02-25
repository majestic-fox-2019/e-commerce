"use strict"
const {Transaction} = require('../models');
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
}

module.exports = TransactionController;