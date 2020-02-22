const mainRoute = require('express').Router()
const productRoute = require('./productRoutes')
const userRoute = require('./userRoutes')
const categoryRoute = require('./categoryRoutes')
const authentication = require('../middlewares/authentication')

mainRoute.use('/user',userRoute)
mainRoute.use('/product',authentication,productRoute)
mainRoute.use('/category',authentication,categoryRoute)

module.exports = mainRoute