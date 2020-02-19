const {Product} = require('../models');
class ProductController {
    static list(req, res, next) {
        Product
            .findAll()
            .then(products => {
                res.status(200).json(products);
            })
            .catch(err => {
                next(err);
            });
    }

    static add(req, res, next) {

    }

    static edit(req, res, next) {
        
    }

    static delete(req, res, next) {

    }
}

module.exports = ProductController;