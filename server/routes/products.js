const router = require('express').Router()
const controller = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const { addProductAuth, editProductAuth, productDeleteAuth } = require('../middlewares/authorization')

router.get('/', controller.findAllProducts)

router.post('/', authentication, addProductAuth, controller.addProduct)

router.get('/categories/:category', controller.findByCategory)

router.get('/:id', controller.findOneProduct)

router.put('/:id', authentication, editProductAuth, controller.editProduct)

router.delete('/:id', authentication, productDeleteAuth, controller.deleteProduct)

router.patch('/:id', authentication, editProductAuth, controller.editStock)

module.exports = router