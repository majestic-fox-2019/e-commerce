const productRouter = require('express').Router()
const productController = require('../controllers/product')
const authorization = require('../middlewares/authorization')

productRouter.post('/', authorization.products, productController.add)
productRouter.put('/:id', authorization.products, productController.edit)
productRouter.delete('/:id', authorization.products, productController.delete)

module.exports = productRouter