const router = require('express').Router()
const controller = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const { addProductAuth, editProductAuth, productDeleteAuth } = require('../middlewares/authorization')
const upload = require('../middlewares/unggah')

router.get('/', controller.findAllProducts)

router.post('/', authentication, addProductAuth, upload.single('img_url'), controller.addProduct)

router.get('/categories/:category', controller.findByCategory)

router.get('/official', controller.findAllOfficial)

router.get('/unOfficial', controller.findAllUnofficial)

router.get('/user', authentication, controller.findByOwner)

router.get('/:id', controller.findOneProduct)

router.put('/:id', authentication, editProductAuth, upload.single('img_url'),controller.editProduct)

router.delete('/:id', authentication, productDeleteAuth, controller.deleteProduct)

router.patch('/:id', authentication, editProductAuth, controller.editStock)

module.exports = router