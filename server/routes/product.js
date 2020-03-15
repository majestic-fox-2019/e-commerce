"use strict"

const express = require("express")
const route = express.Router()
const { product } = require("../controllers")
const { authentication, authorizationCMS } = require("../middlewares")
const upload = require('../middlewares/unggah')

console.log(upload);


route.use(authentication)
route.post('/', authorizationCMS, upload.single('image_url'), product.create)
route.get('/', authorizationCMS, product.getAll)
route.get('/:id', authorizationCMS, product.getOne)
route.put('/:id', authorizationCMS, product.update)
route.delete('/:id', authorizationCMS, product.delete)

module.exports = route