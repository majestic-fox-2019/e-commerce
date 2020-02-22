"use strict"

const express = require("express")
const route = express.Router()
const { product } = require("../controllers")
const { authentication, authorization } = require("../middlewares")

route.use(authentication)
route.post('/', product.create)
route.get('/', product.getAll)
route.get('/:id', product.getOne)
route.put('/:id', authorization,product.update)
route.delete('/:id', authorization, product.getAll)

module.exports = route