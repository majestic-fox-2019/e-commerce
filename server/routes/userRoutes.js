const userRouter = require('express').Router()
const userController = require('../controller/userController')
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')

userRouter.post('/token',userController.token)
userRouter.post('/register',userController.register)
userRouter.post('/login',userController.login)
userRouter.get('/listUser',authorization,userController.listUser)
userRouter.get('/history',authentication,userController.history)
userRouter.get('/allhistory',authorization,userController.allhistory)


module.exports = userRouter