const transactionRouter = require('express').Router()
const transactionController = require('../controllers/transaction')

transactionRouter.get('/', transactionController.list)
transactionRouter.post('/', transactionController.add)

module.exports = transactionRouter