const router = require('express').Router()

const productRouter = require('./product')

const userRouter = require('./user')

const cartRouter = require('./cart')

const transactionRouter = require('./transaction')

const bannerRouter = require('./banner')

router.use('/', userRouter)

router.use('/products', productRouter)

router.use('/carts', cartRouter)

router.use('/transactions', transactionRouter)

router.use('/banners', bannerRouter)

module.exports = router
