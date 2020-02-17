var express = require('express')
var router = express.Router()
const userController = require('../controllers/user')

router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)
// router.get('/', userController.showProduct)
// router.get('/:id', userController.showOneProduct)
// router.put('/:id', userController.updateProduct)
// router.delete('/:id', userController.deleteProduct)

module.exports = router