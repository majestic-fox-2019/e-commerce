const express = require('express')
const router = express.Router()
const Product = require('../controllers/productController')
const { authentication } = require('../middlewares/auth')
const gcs = require('../middlewares/gcs')

router.get('/', Product.findAll)
router.post('/', authentication, gcs.single('file'), Product.addProduct)
router.get('/user', authentication, Product.findUserProduct)
router.get('/category/:category', Product.findByCategory)
router.get('/:productId', Product.findOne)
router.patch('/:productId', authentication, Product.updateProduct)
router.delete('/:productId', authentication, Product.deleteProduct)
module.exports = router
