const productRouter = require('express').Router()
const productController = require('../controllers/product')
const authorization = require('../middlewares/authorization')

productRouter.post('/', authorization.admin, productController.add)
productRouter.put('/:id', authorization.admin, productController.edit)
productRouter.delete('/:id', authorization.admin, productController.delete)

module.exports = productRouter