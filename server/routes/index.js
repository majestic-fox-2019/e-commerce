var express = require('express')
var router = express.Router()
const productRoutes = require('./products')
const registerRoute = require('./register')
const loginRoute = require('./login')
const categoryRoute = require('./categories')

const authentication = require('../middlewares/authentication')
const isAdmin = require('../middlewares/isAdmin')

router.use('/register', registerRoute)
router.use('/login', loginRoute)

router.use(authentication)

router.use('/products', productRoutes)

router.use(isAdmin)

router.use('/categories', categoryRoute)

module.exports = router