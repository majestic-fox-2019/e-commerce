var express = require('express')
var router = express.Router()
const userController = require('../controllers/user')

router.post('/', userController.userRegister)

module.exports = router