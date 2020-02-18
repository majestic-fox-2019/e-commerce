const router = require('express').Router()
const ProductController = require('../controllers/productController')
const Authenticate = require('../middlewares/authentication')
const { normalAuthorization, shopAuthorization } = require('../middlewares/authorization')

router.get('/', ProductController.getAllProducts)
router.get('/:id', ProductController.getOneDetail)
router.get('/categories/:category', ProductController.getByCategories)
router.post('/', Authenticate, shopAuthorization, ProductController.createNew)
router.put('/:id', Authenticate, normalAuthorization, ProductController.editData)
router.delete('/:id', Authenticate, normalAuthorization, ProductController.deleteData)

module.exports = router
