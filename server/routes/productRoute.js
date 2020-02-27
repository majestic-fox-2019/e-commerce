const productRoute = require('express').Router()

const authentication = require('../middlewares/authentication')
const productController = require('../controllers/productController')

productRoute.get('/', productController.listProduct)
productRoute.get('/banner', productController.showBanner)
productRoute.get('/find/:category', productController.listProduct)
productRoute.get('/:id', productController.getProductById)

productRoute.post('/', authentication, productController.addItem)
productRoute.put('/:id', authentication, productController.updateProduct)
productRoute.delete('/:id', authentication, productController.deleteProduct)


module.exports = productRoute