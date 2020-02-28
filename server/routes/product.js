"use strict"

const express = require("express")
const route = express.Router()
const { product } = require("../controllers")
const { authentication, authorization } = require("../middlewares")
const upload = require('../middlewares/unggah')

console.log(upload);


route.use(authentication)
route.post('/', upload.single('image_url'), product.create)
route.get('/', authorization,product.getAll)
route.get('/:id', product.getOne)
route.put('/:id', authorization,product.update)
route.delete('/:id', authorization, product.delete)

module.exports = route