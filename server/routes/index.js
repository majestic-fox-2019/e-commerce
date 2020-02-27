const route = require('express').Router()

const userRoute = require('./userRoute')
const authentication = require('../middlewares/authentication')
const productRoute = require('./productRoute')
const categoryRoute = require('./categoryRoute')
const cartRoute = require('./cartRoute')
const historyRoute = require('./historyRoute')

route
    .use('/users', userRoute)
    .use('/products', productRoute)
    .use('/categories', categoryRoute)
    .use('/histories', authentication, historyRoute)
    .use('/carts', authentication, cartRoute)

module.exports = route