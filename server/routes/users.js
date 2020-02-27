var express = require('express')
var router = express.Router()
const User = require('../controllers/userController')

/* GET users listing. */
router.post('/register', User.register)
router.post('/gauth', User.googleSignIn)
router.post('/login', User.login)

module.exports = router
