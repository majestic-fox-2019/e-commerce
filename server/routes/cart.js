const router = require('express').Router()
const CartController = require('../controllers/cartController')
const Authenticate = require('../middlewares/authentication')

router.get('/', Authenticate, CartController.getUserCart)
router.post('/', Authenticate, CartController.addToCart)

module.exports = router
