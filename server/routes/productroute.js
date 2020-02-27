const router = require('express').Router()
const authorized = require('../middleware/authorization')
const authentication = require('../middleware/authentication')
const ProductController = require('../controllers/productController')

router.get('/product', ProductController.getProduct)
router.post('/product',authentication, ProductController.postProduct)

router.get('/product/:id',authentication,ProductController.getOne)
router.put('/product/:id',authentication,ProductController.putProduct)
router.delete('/product/:id',authentication,ProductController.destroyProduct)

module.exports = router