var express = require('express')
var router = express.Router()
const productRoutes = require('./products')
const registerRoute = require('./register')
const loginRoute = require('./login')
const authentication = require('../middlewares/authentication')

router.use('/register', registerRoute)
router.use('/login', loginRoute)

// router.use(authentication)

router.use('/products', productRoutes)

module.exports = router