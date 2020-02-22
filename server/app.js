const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes')
const errors = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use('/', router)

app.use(errors.client)
app.use(errors.server)

app.listen(PORT, () => {
  console.log(`Engine running on port ${PORT}`)
})

module.exports = app