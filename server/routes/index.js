var express = require('express')
var router = express.Router()

/* GET home page. */
router.use('/users', require('./users'))
router.use('/malls', require('./malls'))
router.use('/products', require('./product'))
router.use('/charts', require('./charts'))

module.exports = router
