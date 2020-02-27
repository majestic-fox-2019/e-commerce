require('dotenv').config()
const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const router = require('./routes/mainRoutes')
const cors = require('cors')
const errorHandler = require('./errorhandling/errorhandler')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)

app.use(errorHandler)

app.listen(port,()=>{
  console.log(`Connected to port: ${port}`)
})

module.exports = app