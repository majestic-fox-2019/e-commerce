const userRouter = require('express').Router()
const userController = require('../controller/userController')
const authorization = require('../middlewares/authorization')

userRouter.post('/register',userController.register)
userRouter.post('/login',userController.login)
userRouter.get('/listUser',authorization,userController.listUser)


module.exports = userRouter