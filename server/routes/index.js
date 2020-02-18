const router = require('express').Router()
const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')

router.use('/users', User)
router.use('/products', Product)
router.use('/carts', Cart)

module.exports = router
