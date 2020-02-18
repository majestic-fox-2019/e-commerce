const router = require('express').Router()

const ProductController = require('../controllers/productController')

router.get('/product', ProductController.getProduct)
router.post('/product', ProductController.postProduct)

router.get('/product/:id',ProductController.getOne)
router.put('/product/:id',ProductController.putProduct)
router.delete('/product/:id',ProductController.destroyProduct)


module.exports = router