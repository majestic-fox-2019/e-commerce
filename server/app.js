if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app
    .use(express.json())
    .use(express.urlencoded( { extended: true } ) )
    .use('/', routes)
    .use(errorHandler)


module.exports = app