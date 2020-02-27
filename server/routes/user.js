const userRouter = require('express').Router()
const userController = require('../controllers/user')
const authorization = require('../middlewares/authorization')

userRouter.get('/', authorization.admin, userController.list)
userRouter.put('/:id', authorization.admin, userController.update)
userRouter.delete('/:id', authorization.admin, userController.delete)

module.exports = userRouter