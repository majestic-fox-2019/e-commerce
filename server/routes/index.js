const router = require('express').Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const categoryRoutes = require('./categoryRoutes')
const authentication = require('../middlewares/authentication')

router.use('/users', userRoutes)
router.use(authentication)
router.use('/categories', categoryRoutes)
router.use('/products', productRoutes)

module.exports = router