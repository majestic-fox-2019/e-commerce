const product = require('express').Router()
const controller = require('../controllers/product')
const auth = require('../middlewares/authToken')

product
    .get('/', controller.getProducts)
    .use(auth)
    .post('/', controller.postProduct)
    .put('/:id', controller.putProduct)
    .delete('/:id', controller.deleteProduct)

module.exports = product