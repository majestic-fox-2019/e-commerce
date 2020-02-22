"use strict"

const express = require("express")
const route = express.Router()
const productRoute = require("./product")
const userRoute = require("./user")

route.use('/products', productRoute)
route.use('/users', userRoute)

module.exports= route
