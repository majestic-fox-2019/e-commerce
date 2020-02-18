const route = require('express').Router()

const userRoute = require('./userRoute')
const authentication = require('../middlewares/authentication')
const productRoute = require('./productRoute')

route
    .use('/users', userRoute)
    .use('/products', authentication, productRoute)

module.exports = route