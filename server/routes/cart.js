const router = require('express').Router()
const CartController = require('../controllers/cartController')
const Authenticate = require('../middlewares/authentication')
const { cartAuthorization } = require('../middlewares/authorization')

// Cart
router.get('/', Authenticate, CartController.getUserCart)
router.post('/', Authenticate, CartController.addToCart)
router.delete('/:id', Authenticate, cartAuthorization, CartController.deleteFromCart)
router.patch('/checkout', Authenticate, CartController.checkoutAll)

// Transaction
router.get('/transaction', Authenticate, CartController.getActiveTransaction)
router.get('/transaction/history', Authenticate, CartController.getHistoryTransaction)
router.get('/user/incomes', Authenticate, CartController.getUserIncome)
router.post('/confirm/:id', Authenticate, cartAuthorization, CartController.confirmTransaction)

module.exports = router
