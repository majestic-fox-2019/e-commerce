const router = require('express').Router()
const ControllerCheckout = require('../controllers/ControllerCheckout')

 // /checkout

router.delete('/:UserId', ControllerCheckout.checkout)

module.exports = router