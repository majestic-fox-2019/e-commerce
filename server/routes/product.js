const productRouter = require('express').Router()
const productController = require('../controllers/product')
const authorization = require('../middlewares/authorization')

productRouter.post('/', productController.add)
productRouter.put('/:id', productController.edit)
productRouter.delete('/:id', productController.delete)

module.exports = productRouter