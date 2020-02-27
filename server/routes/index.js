const express = require('express')
const router = express.Router()
const UserRouter = require('./UserRouter')
const CategoryRouter = require('./CategoryRouter')
const ProductRouter = require('./ProductRouter')
const CartRouter = require('./CartRouter')

router.use('/', UserRouter)
router.use('/', CategoryRouter)
router.use('/', ProductRouter)
router.use('/', CartRouter)

module.exports = router