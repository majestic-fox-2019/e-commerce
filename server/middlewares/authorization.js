const { User, Product } = require('../models')
const jwt = require('jsonwebtoken')

function createAdminAuth(req, res, next){
    if(req.body.role !== 'admin'){
        next()
    } else if(req.body.role == 'admin') {
        let data = jwt.verify(req.headers.token, JWT_SECRET)
        if(data.role !== 'admin') {
            throw ({
                statusCode: 401,
                message: 'unauthorized access'
            })
        } else {
            req.body.shopName = 'Official Store'
            next()
        }
    }
}

function addProductAuth(req, res, next) {
    if (req.loggedUser.role == 'admin') {
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
        productData = productInfo
        return User.findOne({
            where: {
                id: productInfo.UserId
            }
        })
    })
    .then(userInfo => {
        if(userInfo.role == 'admin' && req.loggedUser.role == 'admin'){
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

function productDeleteAuth(req, res, next){
    Product.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(productInfo => {
        if(req.loggedUser.role !== 'admin' && productInfo.UserId !== req.loggedUser.id) {
            throw({
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


module.exports = {
    addProductAuth,
    editProductAuth,
    productDeleteAuth,
    createAdminAuth
}