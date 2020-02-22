const productRouter = require('express').Router()
const productController = require('../controller/productController')
const authorization = require('../middlewares/authorization')
productRouter.get('/listProduct',productController.listProduct)
productRouter.get('/listProduct/category/:id',productController.filterProduct)
productRouter.post('/addProduct',authorization,productController.addProduct)
productRouter.delete('/deleteProduct/:id',authorization,productController.deleteProduct)
productRouter.put('/updateProduct/:id',authorization,productController.updateProduct)


module.exports = productRouter