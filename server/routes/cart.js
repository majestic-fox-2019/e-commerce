"use strict"

const router = require('express').Router()
const cartController = require('../controllers/Cart')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', cartController.addCart)
router.get('/', cartController.findCart)
router.get('/onProcess', cartController.findCartOnProcess)
router.put('/checkout', cartController.checkoutCart)
router.put('/complete/:id', cartController.completeCheckout)
router.delete('/:id', cartController.removeCart)
router.put('/:id', cartController.updateCart)

module.exports = router