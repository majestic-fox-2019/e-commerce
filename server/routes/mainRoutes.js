const mainRoute = require('express').Router()
const productRoute = require('./productRoutes')
const userRoute = require('./userRoutes')
const categoryRoute = require('./categoryRoutes')
const cartRoute = require('./cartRouter')
const authentication = require('../middlewares/authentication')

mainRoute.use('/user',userRoute)
mainRoute.use('/product',productRoute)
mainRoute.use('/category',categoryRoute)
mainRoute.use('/cart',cartRoute)


module.exports = mainRoute