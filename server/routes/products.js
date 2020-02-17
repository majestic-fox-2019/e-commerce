var express = require('express')
var router = express.Router()
const productController = require('../controllers/product')

router.post('/', productController.createProduct)
router.get('/', productController.showProduct)
router.get('/:id', productController.showOneProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router