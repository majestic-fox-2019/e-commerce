const cartRouter = require('express').Router()
const cartController = require('../controller/cartController')
const authentication = require('../middlewares/authentication')

cartRouter.get('/',authentication,cartController.getCart)
cartRouter.post('/',authentication,cartController.addCart)
cartRouter.delete('/',authentication,cartController.deleteCart)
cartRouter.delete('/payment',authentication,cartController.payment)
cartRouter.patch('/',authentication,cartController.updateCart)



module.exports = cartRouter