const router = require('express').Router()

const productRouter = require('./product')

const userRouter = require('./user')

router.use('/', userRouter)

router.use('/products', productRouter)

module.exports = router
