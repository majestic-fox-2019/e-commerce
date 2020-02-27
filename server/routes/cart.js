const express = require('express')
const router = express.Router()
const cart = require('../controllers/cart')
const auth = require('../middleware/authentication')
router 
  .use(auth)
  .get('/history',cart.history)
  .post('/',cart.addCart)
  .get('/',cart.activeCart)
  .patch('/:id',cart.updateAmount)
  .put('/',cart.checkout)
  .delete('/:id',cart.delete)

module.exports = router