const router = require('express').Router()
const user = require('./user')
const product = require('./products')
const cart = require('./cart')

router
    .use('/user', user)
    .use('/products', product)
    .use('/cart', cart)

module.exports = router