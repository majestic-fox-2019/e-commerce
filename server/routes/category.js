const express = require('express')
const router = express.Router()
const category = require('../controllers/category')
const auth = require('../middleware/authentication')
router 
  .use(auth)
  .post('/',category.create)
  .get('/',category.findAll)
  .delete('/:id',category.delete)

module.exports = router