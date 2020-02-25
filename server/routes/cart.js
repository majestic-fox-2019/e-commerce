const router = require('express').Router()
const controller = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')
const { addToCartAuth, deliveryConfirmAuth } = require('../middlewares/authorization')

router.use(authentication)

router.post('/', addToCartAuth, controller.addToCart)

router.get('/', controller.getCart)

router.patch('/checkOut', controller.checkOutItems)

router.delete('/deliveryConfirmation/:id', deliveryConfirmAuth, controller.confirmDelivery)

router.delete('/:id', deliveryConfirmAuth, controller.deleteItem)

module.exports = router