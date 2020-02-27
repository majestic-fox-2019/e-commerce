const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const upload = require('../middlewares/uploadImage')

const productController = require("../controllers/productController")

router.get('/', productController.find)
router.get('/:id', productController.findOne)
router.use(auth.autheticate)
router.post('/', upload.single("image_url"), productController.create)

router.use('/:id', auth.authorize)
router.put('/:id', upload.single("image_url"), productController.update)
router.delete('/:id', productController.delete)



module.exports = router