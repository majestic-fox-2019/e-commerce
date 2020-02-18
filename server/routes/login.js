var express = require('express')
var router = express.Router()
const userController = require('../controllers/user')

router.post('/', userController.userLogin)

module.exports = router