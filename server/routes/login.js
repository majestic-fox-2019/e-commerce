var express = require('express')
var router = express.Router()
const userController = require('../controllers/user')

router.post('/', userController.userLogin)
router.post('/google', userController.googleSignIn)

module.exports = router