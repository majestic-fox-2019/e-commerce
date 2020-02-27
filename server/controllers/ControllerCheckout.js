'use strict'

const { UserProduct, Product, User } = require('../models')

class ControllerCheckout {
  static checkout(req, res, next) {
    const UserId = req.params.UserId;
    UserProduct
      .destroy({ where: { UserId: UserId } })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
      })
  }
}

module.exports = ControllerCheckout