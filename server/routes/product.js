const express = require('express')
const router = express.Router()
const product = require('../controllers/product')
const auth = require('../middleware/authentication')
router 
  .get('/',product.findAll)
  .get('/banner/:limit',product.getNewProduct)
  .get('/category/:id',product.findCategory)
  .use(auth)
  .post('/',product.create)
  .get('/:id',product.findByPk)
  .patch('/:id',product.updateByImage)
  .put('/:id',product.update)
  .delete('/:id',product.delete)

module.exports = router