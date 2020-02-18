const express = require('express')
const app = express()
const port = 3000
const index = require('./routes/index')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',index)

// app.listen(port,()=>{
//     console.log(`listening on port ${port}`)
// })

module.exports= app