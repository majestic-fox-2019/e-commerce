const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const upload = require('../middlewares/uploadImage')

const productController = require("../controllers/productController")

router.use(auth.autheticate)
router.post('/', upload.single("image_url"), productController.create)
router.get('/', productController.find)

router.use('/:id', auth.authorize)
router.put('/:id', productController.update)
router.delete('/:id', productController.delete)
router.get('/:id', productController.findOne)


module.exports = router