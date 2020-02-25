const {Product} = require('../models');
class ProductController {
    static list(req, res, next) {
        Product
            .findAll({
                where: {
                    CategoryId: req.params.CategoryId
                }
            })
            .then(products => {
                res.status(200).json(products);
            })
            .catch(err => {
                next(err);
            });
    }

    static add(req, res, next) {
        const {name, image_url, price, stock, CategoryId} = req.body;
        console.log({name, image_url, price, stock, CategoryId});
        Product
            .create({name, image_url, price, stock, CategoryId})
            .then((product) => {
                res.status(201).json({product, message: "Product has been added!"});
            })
            .catch(err => {
                next(err);
            });
    }

    static edit(req, res, next) {
        const {name, image_url, price, stock, CategoryId} = req.body;
        Product
            .update(
                {name, image_url, price, stock, CategoryId},
                {
                    where: {
                        id: Number(req.params.id)
                    }
                }
            )
            .then(() => {
                res.status(200).json("Product has been updated!");
            })
            .catch(err => {
                next(err);
            });
    }

    static delete(req, res, next) {
        Product
            .destroy({
                where: {
                    id: Number(req.params.id)
                }
            })
            .then(() => {
                res.status(200).json("Product has been deleted!");
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = ProductController;