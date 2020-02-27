const historyRoute = require('express').Router()

const historyController = require('../controllers/historyController')

historyRoute.get('/', historyController.showHistory)

module.exports = historyRoute