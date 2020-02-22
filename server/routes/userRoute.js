const userRoute = require('express').Router()

const UserController = require('../controllers/userController')

userRoute.get('/list', UserController.showAllMember)
userRoute.post('/register', UserController.createUser)
userRoute.post('/login', UserController.loginUser)

module.exports = userRoute