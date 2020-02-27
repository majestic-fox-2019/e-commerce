const router = require('express').Router()
const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const Api = require('./api')

router.use('/users', User)
router.use('/products', Product)
router.use('/carts', Cart)
router.use('/api', Api)

module.exports = router
