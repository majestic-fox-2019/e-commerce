const router = require('express').Router()
const ProductController = require('../controllers/productController')
const Authenticate = require('../middlewares/authentication')
const { normalAuthorization, shopAuthorization } = require('../middlewares/authorization')
const upload = require('../middlewares/uploadImage')

router.get('/', ProductController.getAllProducts)
router.get('/user/my-products', Authenticate, ProductController.getMyProducts)
router.get('/:id', ProductController.getOneDetail)
router.get('/categories/:category', ProductController.getByCategories)
router.post('/', Authenticate, shopAuthorization, upload.single('image_url'), ProductController.createNew)
router.put('/:id', Authenticate, normalAuthorization, upload.single('image_url'), ProductController.editData)
router.delete('/:id', Authenticate, normalAuthorization, ProductController.deleteData)

module.exports = router
