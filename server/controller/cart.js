"use strict"
const { Cart, Product, User } = require("../models")

class CartController {
    static getAll(req, res, next) {
        User.findByPk(
            req.user.id,
            { include: Product }
        )
            .then(response => {
                res.status(200).json(response.Products);
            })
            .catch(error => {
                res.status(404).json(error);
            })
    }
    static findOne(req, res, next) {
        Cart.findOne({
            where: {
                UserId: req.body.UserId
            }
        })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(404).json(err.message);
            });
    }
    static addOne(req, res, next) {
        let objInput = {
            UserId: req.user.id,
            ProductId: req.params.id,
            quantity: req.body.quantity,
        };
        Cart.findOne({
            where: {
                UserId: req.user.id,
                ProductId: req.params.id,
            }
        })
            .then(response => {
                if (response === null) {
                    return Cart.create(objInput)
                }
                else {
                    console.log("masuk")
                    res.status(400).json({ message: "limit one item per customer" })
                }
            })
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                res.status(400).json(err.message);
            });
    }
    static updateOne(req, res, next) {
        let objInput = {
            UserId: req.body.UserId,
            ProductId: req.body.ProductId,
            amount: req.body.amount,
        }
        Cart.findByPk(req.params.id)
            .then(result => {
                res.status(200).json(result);
                return Cart.update(objInput, {
                    where: {
                        id: req.params.id
                    }
                });
            })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(404).json(err.message);
            });
    }
    static checkout(req, res, next) {
        User.findByPk(
            req.user.id,
            { include: Product }
        )
            .then(response => {
                let checker = true;
                let objProduct = [];
                let products = response.Products

                for (let i = 0; i < products.length; i++) {
                    let newObj = {
                        id: products[i].id,
                        stock: products[i].stock,
                        quantity: products[i].Cart.quantity
                    }
                    objProduct.push(newObj)
                }
                for (let i = 0; i < objProduct.length; i++) {
                    if (objProduct[i].stock === 0) {
                        res.status(400).json({ message: "out of stock" })
                    }
                    else {
                        objProduct[i].stock -= objProduct[i].quantity
                    }
                }
                let promiseArr = [];
                for (let i = 0; i < objProduct.length; i++) {
                    let objInput = {
                        stock: objProduct[i].stock
                    };
                    let objIndex = {
                        where: {
                            id: objProduct[i].id
                        }
                    }
                    promiseArr.push(Product.update(objInput, objIndex))
                }
                return Promise.all(promiseArr)
            })
            .then(response => {
                return Cart.destroy({
                    where: {
                        UserId: req.user.id
                    }
                })
            })
            .then(result => {
                if (result === 0) {
                    res.status(404).json(err.message);
                } else {
                    res.status(200).json(result);
                }
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
    static deleteOne(req, res, next) {
        Cart.destroy({
            where: {
                UserId: req.body.UserId,
                ProductId: req.body.ProductId
            }
        })
            .then(result => {
                if (result === 0) {
                    res.status(404).json(err.message);
                } else {
                    res.status(200).json(result);
                }
            })
            .catch(err => {
                res.status(400);
            });
    }
}
module.exports = CartController