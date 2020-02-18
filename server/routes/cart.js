const cartRouter = require('express').Router()
const cartController = require('../controllers/cart')
const authorization = require('../middlewares/authorization')

cartRouter.get('/', cartController.list)
cartRouter.post('/:id', cartController.add)

module.exports = cartRouter