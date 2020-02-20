const router = require('express').Router()
const authorized = require('../middleware/authorization')
const authentication = require('../middleware/authentication')
const ProductController = require('../controllers/productController')

router.get('/product',authentication, ProductController.getProduct)
router.post('/product',authentication, ProductController.postProduct)

router.get('/product/:id',authentication,authorized,ProductController.getOne)
router.put('/product/:id',authentication,authorized,ProductController.putProduct)
router.delete('/product/:id',authentication,authorized,ProductController.destroyProduct)


module.exports = router