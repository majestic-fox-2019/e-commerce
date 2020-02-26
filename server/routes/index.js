const router = require('express').Router()
const user = require('./user')
const products = require('./products')
const category = require('./category')
const cart = require('./cart')

const authentic = require('../middleware/authentic')

router.use('/users', user)
router.use('/products', products)
router.use('/category', category)
router.use(authentic)
router.use('/cart', cart)

module.exports = router