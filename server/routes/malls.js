const express = require('express')
const router = express.Router()
const Mall = require('../controllers/mallController')
const { authentication, adminOnly } = require('../middlewares/auth')

router.get('/', Mall.findAll)
router.post('/', authentication, adminOnly, Mall.addProduct)
router.get('/:mallId', Mall.findOne)
router.patch('/:mallId', authentication, adminOnly, Mall.updateProduct)
router.delete('/:mallId', authentication, adminOnly, Mall.deleteProduct)
module.exports = router
