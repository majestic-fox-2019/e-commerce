"use strict"

const express = require("express")
const route = express.Router()
const productRoute = require("./product")
const userRoute = require("./user")
const categoryRoute = require('./category')
const sizeRoute = require('./size')

route.use('/products', productRoute)
route.use('/users', userRoute)
route.use('/categories', categoryRoute)
route.use('/sizes', sizeRoute)

module.exports= route
