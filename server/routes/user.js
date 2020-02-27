const controllerUser = require('../controllers/user')
const router = require('express').Router()

router.post('/register', controllerUser.register)
router.post('/register/admin', controllerUser.registerAdmin)
router.post('/login', controllerUser.login)
router.post('/login/admin', controllerUser.loginAdmin)
router.post('/googleLogin', controllerUser.googleLogin)

module.exports = router