const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const { authentication, authorization } = require('../middlewares/auth')
const upload = require('../middlewares/unggah')

router.get('/', ProductController.readAll)
router.get('/category/:category', ProductController.readAll)

router.use(authentication)
router.post('/', authorization, upload.single('image_url'), ProductController.create)
router.get('/:id', authorization, ProductController.readOne)
router.put('/:id', authorization,  upload.single('image_url'), ProductController.update)
router.delete('/:id', authorization, ProductController.delete)

module.exports = router