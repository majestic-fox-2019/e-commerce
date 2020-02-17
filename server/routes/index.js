const router = require('express').Router()
const User = require('./user')
const Product = require('./product')

router.use('/users', User)
router.use('/products', Product)

module.exports = router
