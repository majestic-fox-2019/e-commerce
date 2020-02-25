const router = require('express').Router()

const UserController = require('../controllers/usercontroller')

router.post('/admin-login', UserController.login)
router.post('/admin-register', UserController.registerAdmin)

router.post('/user-login', UserController.login)
router.post('/user-register', UserController.registerUser)


module.exports = router