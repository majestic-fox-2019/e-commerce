const { Product } = require("../models");
class ProductController {
    static getAll(req, res, next) {
        Product.findAll()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(404).json(err.message);
            });
    }
    static findOne(req, res, next) {
        Product.findByPk(req.params.id)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(404).json(err.message);
            });
    }
    static addOne(req, res, next) {
        let objInput = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            CategoryId: req.body.CategoryId,
            detail: req.body.detail
        };
        Product.create(objInput)
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                res.status(400).json(err.message);
            });
    }
    static updateOne(req, res, next) {
        let objInput = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            CategoryId: req.body.CategoryId,
            detail: req.body.detail
        }
        Product.findByPk(req.params.id)
            .then(result => {
                res.status(200).json(result);
                return Product.update(objInput, {
                    where: {
                        id: req.params.id
                    }
                });
            })
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(404).json(err.message);
            });
    }
    static deleteOne(req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
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
    static getAllWithCategoryId(req, res, next) {
        Product.findAll({ where: { CategoryId: req.params.id } })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(404).json(err.message);
            });
    }
}
module.exports = ProductController;
