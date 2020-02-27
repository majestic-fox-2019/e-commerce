const productRouter = require('express').Router()
const productController = require('../controller/productController')
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')

productRouter.get('/adminListProduct',productController.adminListProduct)
productRouter.get('/listProduct',productController.listProduct)
productRouter.get('/banner',productController.banner)
productRouter.get('/listProduct/category/:id',productController.filterProduct)
productRouter.get('/adminListProduct/category/:id',productController.filterProductAdmin)
productRouter.post('/addProduct',authorization,productController.addProduct)
productRouter.delete('/deleteProduct/:id',authorization,productController.deleteProduct)
productRouter.put('/updateProduct/:id',authorization,productController.updateProduct)


module.exports = productRouter