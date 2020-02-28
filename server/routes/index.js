var express = require('express')
var router = express.Router()
const productRoutes = require('./products')
const registerRoute = require('./register')
const loginRoute = require('./login')
const categoryRoute = require('./categories')
const userProductRoute = require('./userProduct')

const authentication = require('../middlewares/authentication')

router.use('/register', registerRoute)
router.use('/login', loginRoute)


router.use('/products', productRoutes)
router.use('/categories', categoryRoute)

router.use(authentication)

router.use('/carts', userProductRoute)

module.exports = router