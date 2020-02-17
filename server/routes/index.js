const router = require('express').Router()
const user = require('./user')
const product = require('./products')

router
    .use('/user', user)
    .use('/products', product)

module.exports = router