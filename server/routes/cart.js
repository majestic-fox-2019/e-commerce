const cart = require('express').Router()
const controller = require('../controllers/cart')
const auth = require('../middlewares/authToken')

cart
    .use(auth)
    .get('/', controller.getCarts)
    .post('/', controller.postCart)
    .put('/checkout', controller.checkout)
    .put('/:id', controller.putCart)
    .delete('/:id', controller.deleteCart)

module.exports = cart