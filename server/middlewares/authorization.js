const { User, Product, Cart } = require('../models')
const jwt = require('jsonwebtoken')

function checkAdmin(req, res, next) {
    if (req.loggedUser.role !== 'admin') {
        next({
            statusCode: 401,
            message: 'unauthorized access'
        })
    } else {
        next()
    }
}

function createAdminAuth(req, res, next) {
    if (req.body.role !== 'admin') {
        next()
    } else if (req.body.role == 'admin') {
        if(!req.headers.token){
            next({
                statusCode: 401,
                message: 'unauthorized access'
            })
        }
        req.loggedUser = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        if (req.loggedUser.role !== 'admin') {
            next({
                statusCode: 401,
                message: 'unauthorized access'
            })
        } else {
            req.body.shopName = 'Official Store'
            console.log(req.body)
            next()
        }
    }
}

function addProductAuth(req, res, next) {
    if (req.loggedUser.role == 'admin') {
        req.admin = true
        next()
    } else {
        User.findOne({
            where: {
                id: req.loggedUser.id
            }
        })
            .then(userData => {
                if (userData.shopName) {
                    next()
                } else {
                    throw ({
                        statusCode: 400,
                        message: 'To start selling items, please create a shop first'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

function editProductAuth(req, res, next) {
    let productData
    Product.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(productInfo => {
            if(!productInfo) {
                throw ({
                    statusCode: 404,
                    message: 'Product not found'
                })
            }
            productData = productInfo
            return User.findOne({
                where: {
                    id: productInfo.UserId
                }
            })
        })
        .then(userInfo => {
            if (userInfo.role == 'admin' && req.loggedUser.role == 'admin') {
                next()
            } else if (userInfo.role !== 'admin' && req.loggedUser.id !== productData.UserId) {
                throw ({
                    statusCode: 401,
                    message: 'You are unauthorized to edit this product'
                })
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

function productDeleteAuth(req, res, next) {
    Product.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(productInfo => {
            if (req.loggedUser.role !== 'admin' && productInfo.UserId !== req.loggedUser.id) {
                throw ({
                    statusCode: 401,
                    message: 'You are unauthorized to edit this product'
                })
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

function addToCartAuth(req, res, next) {
    if (req.loggedUser.role == 'admin') {
        throw ({
            statusCode: 403,
            message: 'You are unauthorized to do this action'
        })
    } else {
        Product.findOne({
            where: {
                id: req.body.ProductId
            }
        })
            .then(productInfo => {
                if (productInfo.UserId == req.loggedUser.id) {
                    throw ({
                        statusCode: 400,
                        message: 'You cannot make transaction with your own product'
                    })
                } else if (productInfo.stock < req.body.qty) {
                    throw ({
                        statusCode: 400,
                        message: `We're sorry the current stock is insufficient`
                    })
                } else {
                    next()
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

function deliveryConfirmAuth(req, res, next){
    Cart.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(cartData => {
        if(!cartData) {
            throw({
                statusCode: 404,
                message: 'Invalid Cart'
            })
        } else if(cartData.UserId !== req.loggedUser.id) {
            throw({
                statusCode: 401,
                message: 'You are unauthorized to edit this cart'
            })
        } else {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}


module.exports = {
    addProductAuth,
    editProductAuth,
    productDeleteAuth,
    createAdminAuth,
    addToCartAuth,
    deliveryConfirmAuth,
    checkAdmin
}