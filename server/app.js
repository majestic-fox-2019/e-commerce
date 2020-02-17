if(!process.env.NODE_ENV || process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test") {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const router = require('./routes')
const errHandling = require('./middlewares/errorHandling')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/', router)
app.use(errHandling)
app.listen(PORT, () => {
  console.log(`listening to ${PORT}`)
})

module.exports = app