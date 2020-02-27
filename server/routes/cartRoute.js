const authentication = require('../middleware/authentication')
const cartController = require('../controllers/cartController')

const router = require('express').Router()

router.get('/cart', authentication,cartController.getCart)
router.post('/cart', authentication,cartController.postCart)
router.delete('/cart/:id', authentication,cartController.deleteOneCart)
router.put('/cart/:id', authentication,cartController.editQty)
router.post('/cart-checkout', authentication,cartController.checkout)

module.exports = router