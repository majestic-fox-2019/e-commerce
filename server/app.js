require('dotenv').config()
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
const errorHandler = require('./middlewares/errorHandler')

app.use('/', indexRouter)
app.use(errorHandler)

module.exports = app
