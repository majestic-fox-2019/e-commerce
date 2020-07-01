'use strict'

const route = require('express').Router()
const Categorycontroller = require('../controllers/category')

route.get('/', Categorycontroller.getAll)
route.post('/', Categorycontroller.create)

module.exports = route