var express = require('express')
var router = express.Router()
const productController = require('../controllers/product')
const isAdmin = require('../middlewares/isAdmin')
const authentication = require('../middlewares/authentication')

router.get('/', productController.showProduct)
router.get('/:id', productController.showOneProduct)

router.use(authentication)
router.use(isAdmin)

router.post('/', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router