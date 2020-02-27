const router = require('express').Router()

const UserController = require('../controllers/usercontroller')

router.post('/admin-login', UserController.loginAdmin)
router.post('/admin-register', UserController.registerAdmin)

router.post('/user-login', UserController.loginUser)
router.post('/user-register', UserController.registerUser)


module.exports = router