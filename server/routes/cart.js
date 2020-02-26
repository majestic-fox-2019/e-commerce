const cartRouter = require('express').Router()
const cartController = require('../controllers/cart')
const authorization = require('../middlewares/authorization')

cartRouter.get('/', cartController.list)
cartRouter.post('/:id', cartController.add)
cartRouter.put('/:productId', cartController.editAmount)
cartRouter.delete('/:productId', cartController.delete)
cartRouter.delete('/', cartController.deleteAll)

module.exports = cartRouter