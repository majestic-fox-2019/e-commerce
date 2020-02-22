if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use(routes)
app.use(errorHandler)

if(process.env.NODE_ENV !== 'test'){
  app.listen(port , () => {
    console.log(`Server running on server ${port}`)
  })
  
}
module.exports = app