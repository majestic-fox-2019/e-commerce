const router = require('express').Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const transactionRoutes = require('./transactionRoutes')
const categoryRoutes = require('./categoryRoutes')
const authentication = require('../middlewares/authentication')

router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use('/transaction', transactionRoutes)
router.use('/categories', categoryRoutes)

module.exports = router