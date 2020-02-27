"use strict"

const { User, Product } = require('../models')
const jwt = require('../helper/jwt')

function autheticate(req, res, next) {
    try {
        const token = jwt.checkToken(req.headers.access_token)
        User.findByPk(token.id)
            .then(user => {
                if (!user) {
                    next({ message: 'user not found' })
                } else {
                    req.userId = token.id
                    req.userEmail = token.email
                    next()
                }
            })
    }
    catch (err) {
        next(err)
    }
}

function authorize(req, res, next) {
    try {
        Product.findByPk(req.params.id)
            .then(product => {
                if (!product) {
                    next({ message: 'you are not authorize' })
                } else {
                    if (product.UserId === req.userId) {
                        next()
                    } else {
                        next({ message: 'you are not authorize' })
                    }
                }
            })
    }
    catch (err) {
        next(err)
    }
}

function checkAdmin(req, res, next) {
    try {
        const token = jwt.checkToken(req.headers.access_token)
        User.findByPk(token.id)
            .then(user => {
                if (!user) {
                    next({ message: 'user not found' })
                } else {
                    if (user.roles === 'admin') {
                        req.userId = token.id
                        req.userEmail = token.email
                        next()
                    } else {
                        next({ message: 'you are not authorize' })
                    }

                }
            })
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    autheticate,
    authorize,
    checkAdmin
}