const express = require('express')
const router = express.Router()
const UserRouter = require('./UserRouter')
const CategoryRouter = require('./CategoryRouter')
const ProductRouter = require('./ProductRouter')

router.use('/', UserRouter)
router.use('/', CategoryRouter)
router.use('/', ProductRouter)

module.exports = router