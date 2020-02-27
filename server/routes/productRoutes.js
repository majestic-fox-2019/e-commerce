const router = require('express').Router()
const productController = require('../controllers/productController')
const isAdmin = require('../middlewares/isAdmin')
const isProductExist = require('../middlewares/isProductExist')
const authentication = require('../middlewares/authentication')

router.get('/', productController.getAllProducts)
router.post('/admin', authentication ,isAdmin, productController.createProducts)
router.patch('/admin/:product_id', authentication ,isAdmin, isProductExist,productController.updateStatusProduct)
router.put('/admin/:product_id', authentication, isAdmin, isProductExist,productController.updateProducts)
router.delete('/admin/:product_id', authentication, isAdmin, isProductExist,productController.deleteProducts)
router.get('/detail/:product_id', isProductExist, productController.getProductById)

module.exports = router