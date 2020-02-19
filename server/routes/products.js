var express = require('express')
var router = express.Router()
const productController = require('../controllers/product')
const isAdmin = require('../middlewares/isAdmin')

router.get('/', productController.showProduct)

// router.use(isAdmin)

router.post('/', productController.createProduct)
router.get('/:id', productController.showOneProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router