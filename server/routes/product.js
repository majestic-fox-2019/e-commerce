const express = require('express')
const router = express.Router()
const product = require('../controllers/product')
const auth = require('../middleware/authentication')
router 
  .use(auth)
  .post('/',product.create)
  .get('/',product.findAll)
  .get('/category/:id',product.findCategory)
  .get('/:id',product.findByPk)
  .patch('/:id',product.updateByImage)
  .put('/:id',product.update)
  .delete('/:id',product.delete)

module.exports = router