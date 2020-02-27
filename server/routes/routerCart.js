const router = require('express').Router()
const ControllerCart = require('../controllers/ControllerCart')

// /carts

router.get('/', ControllerCart.getCarts)
router.post('/', ControllerCart.createCarts)
router.delete('/:id', ControllerCart.destroyCarts)
router.patch('/:id', ControllerCart.patchCarts)

module.exports = router