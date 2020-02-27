const express = require('express')
const router = express.Router()
const category = require('../controllers/category')
const auth = require('../middleware/authentication')
router 
  .get('/',category.findAll)
  .use(auth)
  .post('/',category.create)
  .delete('/:id',category.delete)

module.exports = router