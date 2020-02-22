'use strict'

const express = require("express")
const route = express.Router()
const { user } = require("../controllers")

route.post('/register', user.register)
route.post('/login', user.login)

module.exports = route