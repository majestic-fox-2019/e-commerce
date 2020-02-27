const express = require('express')
const router = express.Router()

const userRoutes = require('./user')
const productRoutes = require('./product')
const cartRoutes = require('./cart')

router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use('/carts', cartRoutes)



module.exports = router