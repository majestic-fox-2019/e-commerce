const router = require('express').Router()

const Controller = require('../controllers/cart')

const authenticate = require('../middlewares/authenticate')

const checkStock = require('../middlewares/checkStock')

router.use(authenticate)

router.post('/check', Controller.checkStock)

router.post('/', Controller.create)

router.get('/', Controller.read)

router.get('/confirm', Controller.readOnConfirm)

router.put('/', Controller.updateQuantity)

router.patch('/', checkStock, Controller.checkout)

router.patch('/approve', Controller.approve)

router.delete('/', Controller.delete)

router.delete('/confirm', Controller.confirmOrder)

module.exports = router
