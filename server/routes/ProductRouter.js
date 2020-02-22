const express = require('express')
const router  = express.Router()
const ProductController = require('../controllers/ProductController')
const middleware = require('../middlewares/middleware')

router.get('/admin/products', middleware.verifyToken, middleware.allAdmin, ProductController.getProductAll)
router.post('/admin/product', middleware.verifyToken, middleware.allAdmin, ProductController.createProduct)
router.get('/admin/product/:id', middleware.verifyToken, middleware.allAdmin, ProductController.getDetailProduct)
router.put('/admin/product/:id', middleware.verifyToken, middleware.allAdmin, ProductController.updateProduct)
router.delete('/admin/product/:id', middleware.verifyToken, middleware.allAdmin, ProductController.deleteProduct)

module.exports = router