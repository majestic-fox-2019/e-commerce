const product = require('express').Router()
const controller = require('../controllers/product')

product
    .get('/', controller.getProducts)
    .post('/', controller.postProduct)
    .put('/:id', controller.putProduct)
    .delete('/:id', controller.deleteProduct)

module.exports = product