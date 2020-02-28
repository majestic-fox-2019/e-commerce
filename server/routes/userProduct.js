var express = require('express')
var router = express.Router()
const userProductController = require('../controllers/userproduct')
const userController = require('../controllers/user')

router.post('/:ProductId', userProductController.create)
router.get('/', userController.userCart)
router.put('/', userProductController.checkoutCart)
router.delete('/:ProductId', userProductController.deleteItem)
router.put('/:ProductId', userProductController.updateAmount)

module.exports = router