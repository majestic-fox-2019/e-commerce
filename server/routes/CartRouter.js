const express = require('express')
const router  = express.Router()
const CartController = require('../controllers/CartController')
const middleware = require('../middlewares/middleware')

router.get('/carts/:id', middleware.verifyToken, CartController.getAllCart)
router.post('/cart', middleware.verifyToken, CartController.addItem)
router.get('/cart/minquantity/:id', middleware.verifyToken, CartController.minusCart)
router.get('/cart/plusquantity/:id', middleware.verifyToken, CartController.plusCart)
router.delete('/cart/:id', middleware.verifyToken, CartController.deleteCart)
router.post('/transaction/:id', middleware.verifyToken, CartController.doTransaction)
router.get('/transactions/:id', middleware.verifyToken, CartController.getAllTransaction)
router.delete('/transaction/:id', middleware.verifyToken, CartController.deleteTransaction)

module.exports = router