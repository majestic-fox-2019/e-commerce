const express = require('express');
const router = express.Router();
const Product = require('./product')
const User = require('./user')

router.use('/', User)
router.use('/products', Product)

module.exports = router