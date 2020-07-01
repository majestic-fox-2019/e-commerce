'use strict'

const route = require('express').Router()
const SizeController = require('../controllers/size')
route.get('/', SizeController.getAll)
route.post('/', SizeController.create)

module.exports = route
