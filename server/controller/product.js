const { Product } = require("../models");
class ProductController {
    static getAll(req, res, next) {
        Product.findAll()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(404).json({ message: "data not found" });
            });
    }
    static findOne(req, res, next) {
        Product.findByPk(req.params.id)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(404).json({ message: "data not found" });
            });
    }
    static addOne(req, res, next) {
        let objInput = {
            name: req.body.name,
            img_url: req.body.img_url,
            price: req.body.price,
            stock: req.body.stock
        };
        Product.create(objInput)
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
    static updateOne(req, res, next) {
        let objInput = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        };
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
                res.status(404).json({ message: "data not found" });
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
                    res.status(404).json({ message: "data not found" });
                } else {
                    res.status(200).json(result);
                }
            })
            .catch(err => {
                res.status(400);
            });
    }
}
module.exports = ProductController;
