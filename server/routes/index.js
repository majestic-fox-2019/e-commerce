const router = require('express').Router()
const UserController = require('../controllers/UserController')
const ProductRouter = require('./ProductRouter')
const CartRouter = require('./CartRouter')
const TransactionRouter = require('./TransactionRouter')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use('/product', ProductRouter)
router.use('/cart', CartRouter)
router.use('/transaction', TransactionRouter)

module.exports = router