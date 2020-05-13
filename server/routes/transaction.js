"use strict"

const router = require('express').Router()
const transactionController = require('../controllers/Transaction')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', transactionController.addTransaction)
router.get('/', transactionController.findTransaction)

module.exports = router