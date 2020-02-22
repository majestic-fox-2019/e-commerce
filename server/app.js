// if( process.env.NODE_ENV === 'development' || "test" ){
//   require('dotenv').config()
// }

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const errorHandling = require('./helper/errorhandling')
const cors = require('cors')
const indexRoute = require('./routes/index')

app
  .use(express.static('public'))
  .use(express.urlencoded({extended:true}))
  .use(cors())
  .use(express.json())
  .use('/',indexRoute)

  .use(errorHandling)




app.listen(PORT,function(){
  console.log('Running on port '+ PORT)
})

module.exports = app