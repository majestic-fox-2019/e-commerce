const express = require('express')
const router = express.Router()
const app = express()
const userRouter = require('./userroutes')
const productRouter = require('./productroute')
const cartRouter = require('./cartRoute')

router.use('/',userRouter)
  router.use('/',productRouter)
    router.use('/',cartRouter)



module.exports = router