const router = require('express').Router()
const controller = require('../controllers/userController')
const { createAdminAuth } = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')

router.post('/register', createAdminAuth, controller.register)

router.post('/login', controller.login)

router.use(authentication)

router.patch('/shop', controller.registerShop)

router.get('/purchases', controller.getPurchases)

router.get('/incomes', controller.getIncomes)

module.exports = router