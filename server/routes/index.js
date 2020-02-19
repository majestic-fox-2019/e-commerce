const express = require('express')
const router = express.Router()
const product = require('./product')
const category = require('./category')
const user = require('./user')
const authentication = require('../middleware/authentication')


router.use('/user',user)
router.use(authentication)
router.use ('/products',product)
router.use('/category',category)

module.exports = router