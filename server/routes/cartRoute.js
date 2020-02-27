const cartRoute = require('express').Router()

const cartController = require('../controllers/cartController')

cartRoute.get('/', cartController.showUserCart)
cartRoute.post('/', cartController.addCart)
cartRoute.put('/', cartController.proceedPayment)
cartRoute.patch('/:id', cartController.changeQty)
cartRoute.delete('/:id', cartController.deleteCart)

module.exports = cartRoute