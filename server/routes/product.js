"use strict"

const router = require('express').Router()
const productController = require('../controllers/Product')
const authentication = require('../middlewares/authentication')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const upload = require('../middlewares/uploadImage')

router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.use(authentication)
router.post('/', authorizeAdmin, upload.single("image_url"), productController.create)
router.put('/:id', authorizeAdmin, upload.single("image_url"), productController.update)
router.delete('/:id', authorizeAdmin, productController.remove)

module.exports = router