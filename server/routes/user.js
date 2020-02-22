const express = require('express')
const router = express.Router()
const user = require('../controllers/user')
const auth = require('../middleware/authentication')
router.post('/register',user.create)
router.post('/login',user.login)
router.get('/',auth,user.findAll)
router.post('/',auth,user.createAdmin)
router.delete('/:id',auth,user.delete)

module.exports = router