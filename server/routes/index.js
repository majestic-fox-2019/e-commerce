var express = require('express')
var router = express.Router()
const productRoutes = require('./products')
const userRoutes = require('./user')
const authentication = require('../middlewares/authentication')

router.use('/user', userRoutes)

router.use(authentication)

router.use('/products', productRoutes)

module.exports = router