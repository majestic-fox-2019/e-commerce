const router = require('express').Router()
const UserController = require('../controllers/userController')
const checkUser = require('../middlewares/checkUser')
const authentication = require('../middlewares/authentication')
const isAdmin = require('../middlewares/isAdmin')

router.post('/register', UserController.registerUser)
router.post('/admin/login' ,UserController.loginAdmin)

router.use(authentication)

router.get('/admin', isAdmin, UserController.getUserData)
router.post('/admin', isAdmin, UserController.createAdmin)
router.put('/admin/:user_id', checkUser, isAdmin ,UserController.updateUserData)
router.delete('/admin/:user_id', checkUser, isAdmin, UserController.deleteUserData)
router.get('/detail/:user_id', checkUser, UserController.getUserDataById)

module.exports = router