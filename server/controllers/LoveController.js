"use strict"
const {Love} = require('../models');
class LoveController {
    static addToLove(req, res, next) {
        const {UserId, ProductId} = req.body;
        Love
          .create({UserId, ProductId})
          .then(() => {
              res.status(201).json("Sucess add product to love list");
          })
          .catch(err => {
              next(err);
          });
    }
}

module.exports = LoveController;