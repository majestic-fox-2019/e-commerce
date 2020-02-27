'use strict'

const { UserProduct, Product, User } = require('../models')


class ControllerCart {
  static getCarts(req, res, next) {
    console.log("masukkk gakkk?");
    UserProduct
      .findAll({
        include: [Product],
        where: {
          UserId: req.user.id
        }
      })
      .then(result => {
        console.log('masuk then gakk?');
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err);
      })
  }
  static createCarts(req, res, next) {
    console.log('masuk sini gakkk?');
    const { ProductId, quantity } = req.body
    UserProduct
      .create({
        ProductId,
        quantity,
        UserId: req.user.id
      })
      .then(result => {
        console.log('masukk then gak??', result);
        res.status(201).json(result)
      })
      .catch(err => {
        console.log(err);
      })
  }
  static destroyCarts(req, res, next) {
    const findOne = UserProduct.findOne({
      where: {
        id: req.params.id
      }
    })
    const destroy = UserProduct.destroy({
      where: {
        id: req.params.id
      }
    })
    Promise.all([findOne, destroy])
      .then(result => {
        res.status(200).json(result[0])
      })
      .catch(err => {
        console.log(err);
      })
  }
  static patchCarts(req, res, next) {
    const { quantity } = req.body
    UserProduct
      .update({
        quantity,
      }, { where: { id: req.params.id } })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err);
      })
  }
}

module.exports = ControllerCart