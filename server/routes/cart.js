const controllerCart = require('../controllers/cart')
const route = require('express').Router()


route.get('/', controllerCart.getAll)
route.post('/', controllerCart.addCart)
route.patch('/checkout', controllerCart.checkout)
route.patch('/:id', controllerCart.editCart)
route.delete('/:id', controllerCart.deleteCart)

module.exports = route