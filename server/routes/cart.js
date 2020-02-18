const router = require('express').Router()

const Controller = require('../controllers/cart')

const authenticate = require('../middlewares/authenticate')

const checkStock = require('../middlewares/checkStock')

router.use(authenticate)

router.post('/', Controller.create)

router.get('/', Controller.read)

router.put('/', Controller.updateQuantity)

router.patch('/', checkStock, Controller.checkout)

router.delete('/', Controller.delete)

router.delete('/confirm', Controller.confirmOrder)

module.exports = router
