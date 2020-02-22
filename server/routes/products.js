const controllerProducts = require('../controllers/products')
const router = require('express').Router()
const authoris = require('../middleware/authoris')
// authris member

router.get('/', controllerProducts.productsAll)
// router.use()
router.post('/', controllerProducts.createProduct)
router.put('/:id', controllerProducts.updateProduct)
router.delete('/:id', controllerProducts.deleteProduct)

module.exports = router