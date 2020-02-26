const router = require('express').Router()
const controller = require('../controllers/userController')
const { createAdminAuth, checkAdmin } = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')

router.post('/register', createAdminAuth, controller.register)

router.post('/login', controller.login)

router.use(authentication)

router.get('/userInfo', controller.getUserInfo)

router.get('/admins', checkAdmin, controller.getAllAdmins)

router.patch('/shop', controller.registerShop)

router.get('/purchases', controller.getPurchases)

router.get('/incomes', controller.getIncomes)

module.exports = router