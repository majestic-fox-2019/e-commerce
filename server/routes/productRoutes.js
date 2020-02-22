const router = require('express').Router()
const productController = require('../controllers/productController')
const isAdmin = require('../middlewares/isAdmin')
const isProductExist = require('../middlewares/isProductExist')

router.get('/', productController.getAllProducts)
router.post('/admin', isAdmin, productController.createProducts)
router.patch('/admin/:product_id', isAdmin, isProductExist,productController.updateStatusProduct)
router.put('/admin/:product_id', isAdmin, isProductExist,productController.updateProducts)
router.delete('/admin/:product_id', isAdmin, isProductExist,productController.deleteProducts)
router.get('/detail/:product_id', isProductExist, productController.getProductById)

module.exports = router