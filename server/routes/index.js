const route = require('express').Router()

const userRoute = require('./userRoute')
const authentication = require('../middlewares/authentication')
const productRoute = require('./productRoute')
const categoryRoute = require('./categoryRoute')

route
    .use('/users', userRoute)
    .use('/products', authentication, productRoute)
    .use('/categories', authentication, categoryRoute)

module.exports = route