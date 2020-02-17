const router = require('express').Router()
const controller = require('../controllers/userController')
const { createAdminAuth } = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')

router.post('/register', createAdminAuth, controller.register)

router.post('/login', controller.login)

router.patch('/shop', authentication, controller.registerShop)

module.exports = router