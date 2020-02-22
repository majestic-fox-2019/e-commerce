const userRouter = require('express').Router()
const userController = require('../controllers/user')
// const authorization = require('../middlewares/authorization')

userRouter.get('/', userController.list)
userRouter.put('/:id', userController.update)
userRouter.delete('/:id', userController.delete)

module.exports = userRouter