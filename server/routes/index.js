const router = require('express').Router()
const user = require('./user')
const products = require('./products')
const category = require('./category')

const authentic = require('../middleware/authentic')

router.use('/users', user)
router.use(authentic)
router.use('/products', products)
router.use('/category', category)

module.exports = router