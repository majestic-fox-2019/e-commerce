const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController') 
const middleware = require('../middlewares/middleware')

router.post('/verify', UserController.verifyUser)
router.post('/admin/register', UserController.addUser)
router.post('/admin/login', UserController.doLogin)
router.get('/admin/users', middleware.verifyToken, middleware.onlySuperadmin, UserController.getDataUser)
router.post('/admin/user', middleware.verifyToken, middleware.onlySuperadmin, UserController.addUser)
router.get('/admin/user/:id', middleware.verifyToken, middleware.onlySuperadmin, UserController.detailUser)
router.put('/admin/user/:id', middleware.verifyToken, middleware.onlySuperadmin, UserController.updateUser)
router.delete('/admin/user/:id', middleware.verifyToken, middleware.onlySuperadmin, UserController.deleteUser)
router.patch('/admin/user/changepassword/:id', middleware.verifyToken, middleware.onlySuperadmin, UserController.changePass)

module.exports = router