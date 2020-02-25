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

    static getTotalByUser(req, res, next) {
        Love
            .findAll({
                where: {
                    UserId: req.params.UserId
                }
            })
            .then(loves => {
                res.status(200).json(loves.length);
            })
            .catch(err => {
                next(err);
            });
    }
}

module.exports = LoveController;