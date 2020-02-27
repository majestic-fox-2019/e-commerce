const index = require('express').Router()
const user = require('./user')
const userController = require('../controllers/user')
const category = require('./category')
const product = require('./product')
const cart = require('./cart')

index
    .post('/login', userController.login)
    .post('/google-signin', userController.googleSignIn)
    .use('/users', user)
    .use('/carts', cart)
    .use('/categories', category)
    .use('/products', product)

module.exports = index