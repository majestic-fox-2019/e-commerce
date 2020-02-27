const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const productController = require("../controllers/productController")


router.use(auth.autheticate)
router.patch('/', productController.addCart)
router.patch('/one', productController.addOneCart)
router.get('/', productController.getCart)
router.patch('/:id', productController.deleteOneCart)
router.patch('/:id/checkout', productController.checkOut)

module.exports = router