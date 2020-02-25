const router = require('express').Router()
const CartController = require('../controllers/cartController')
const Authenticate = require('../middlewares/authentication')

router.get('/', Authenticate, CartController.getUserCart)
router.post('/', Authenticate, CartController.addToCart)
router.delete('/:id', Authenticate, CartController.deleteFromCart)
router.patch('/checkout', Authenticate, CartController.checkoutAll)

module.exports = router
