if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require("dotenv").config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes/index')
const errorHandling = require('./middlewares/errorHandling')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', route)
app.use(errorHandling)

app.listen(port, () => console.log(`Listening on port ${port}!`))

module.exports = app