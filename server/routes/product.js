"use strict"

const router = require('express').Router()
const productController = require('../controllers/Product')
const authentication = require('../middlewares/authentication')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const authorizeAdminProduct = require('../middlewares/authorizeAdminProduct')
const upload = require('../middlewares/uploadImage')

router.get('/', productController.getAll)
router.get('/admin', authentication, productController.getAllProductAdmin)
router.get('/:id', productController.getOne)
router.post('/', authentication, authorizeAdmin, upload.single("image_url"), productController.create)
router.put('/:id', authentication, authorizeAdmin, authorizeAdminProduct, upload.single("image_url"), productController.update)
router.delete('/:id', authentication, authorizeAdmin, authorizeAdminProduct, productController.remove)

module.exports = router