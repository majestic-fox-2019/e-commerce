const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
var server = require('http').Server(app);
var io = require('socket.io')(server);
require('dotenv').config()
app.get('/', (req, res) => res.send('Hello World!'))
app
  .use(express.json())
  .use(express.urlencoded({extended:true}))
  .use(cors())
  .use((req,res,next) =>{
    req.io = io
    next()
  })
  .use(routes)
  .use(errorHandler)

io.on('connection', function (socket) {
  socket.on('reload product',() => {
    console.log('tets')
    io.emit("products")
  })
});

server.listen(port,() => {
  console.log(`listen to port ${port}`)
})

module.exports = app