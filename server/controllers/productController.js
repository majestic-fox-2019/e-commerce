const { Product, User } = require('../models')
const { Op } = require('sequelize')
const convert = require('../helpers/rpConverter')

class ProductController {
    static addProduct(req, res, next) {
        let {
            name,
            desc,
            price,
            stock,
            img_url,
            category
        } = req.body
        Product.create({
            name,
            desc,
            price,
            stock,
            img_url,
            category,
            UserId: req.loggedUser.id,
            official: req.admin || false
        })
            .then(newProduct => {
                res.status(201).json(newProduct)
            })
            .catch(err => {
                // console.log(err);

                next(err)
            })
    }

    static findAllProducts(req, res, next) {
        Product.findAll({
            where: {
                stock: {
                    [Op.gt]: 0
                }
            },
            include: [{
                model: User,
                attributes: ['shopName', 'email']
            }]
        })
            .then(allProducts => {
                allProducts.forEach(element => {
                    element.price = convert(element.price)
                });
                res.status(200).json(allProducts)
            })
            .catch(err => {
                next(err)
            })
    }

    static findOneProduct(req, res, next) {
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(productData => {
                if (!productData) {
                    throw ({
                        statusCode: 404,
                        message: 'Product not found'
                    })
                } else {
                    productData.price = convert(productData.price)
                    res.status(200).json(productData)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static findByCategory(req, res, next) {
        Product.findAll({
            where: {
                category: req.params.category,
                stock: {
                    [Op.gt]: 0
                }
            }
        })
            .then(productsByCategory => {
                if (productsByCategory.length < 1) {
                    throw ({
                        statusCode: 404,
                        message: 'Category not found'
                    })
                } else {
                    productsByCategory.forEach(element => {
                        element.price = convert(element.price)
                    });
                    res.status(200).json(productsByCategory)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static editProduct(req, res, next) {
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(productData => {
                // console.log(req.body.img_url);
                let {
                    name,
                    desc,
                    price,
                    stock,
                    img_url,
                    category
                } = req.body
                if (img_url == 'null') {
                    img_url = productData.img_url
                }
                Product.update({
                    name,
                    desc,
                    price,
                    stock,
                    img_url,
                    category
                }, {
                    where: {
                        id: req.params.id
                    },
                    returning: true
                })
            })
            .then(editedProduct => {
                res.status(200).json('ProductUpdated')
                // res.status(200).json(editedProduct)
            })
            .catch(err => {

                next(err)
            })
    }

    static deleteProduct(req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(deletedCount => {
                res.status(200).json(deletedCount)
            })
            .catch(err => {
                next(err)
            })
    }

    static editStock(req, res, next) {
        Product.update({
            stock: req.body.stock
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(editedProduct => {
                res.status(200).json(editedProduct[1][0].dataValues)
            })
            .catch(err => {
                next(err)
            })
    }

    static findAllOfficial(req, res, next) {
        Product.findAll({
            where: {
                official: true
            },
            include: [{
                model: User,
                attributes: ['shopName', 'email']
            }]
        })
        .then(officialProducts => {
            officialProducts.forEach(element => {
                element.price = convert(element.price)
            });
            res.status(200).json(officialProducts)
        })
        .catch(err => {
            next(err)
        })
    }
    static findByOwner(req, res, next) {
        Product.findAll({
            where: {
                UserId: req.loggedUser.id
            },
            include: [{
                model: User,
                attributes: ['shopName', 'email']
            }]
        })
        .then(ownerProducts => {
            ownerProducts.forEach(element => {
                element.price = convert(element.price)
            });
            res.status(200).json(ownerProducts)
        })
        .catch(err => {
            console.log(err);
            
            next(err)
        })
    }

    static findAllUnofficial (req, res, next) {
        Product.findAll({
            where: {
                official: false
            },
            include: [{
                model: User,
                attributes: ['shopName', 'email']
            }]
        })
        .then(unOfficialProducts => {
            unOfficialProducts.forEach(element => {
                element.price = convert(element.price)
            });
            res.status(200).json(unOfficialProducts)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductController