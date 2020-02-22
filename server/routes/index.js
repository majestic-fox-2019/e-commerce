const router = require('express').Router()
const UserController = require('../controllers/UserController')
const ProductRouter = require('./ProductRouter')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use('/product', ProductRouter)

module.exports = router