const router = require('express').Router()
const UserController = require('../controllers/userController')
const Authenticate = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.patch('/create-shop', Authenticate, UserController.addShop)
router.get('/', Authenticate, UserController.getUserInfo)

module.exports = router
