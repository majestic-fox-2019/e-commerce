const express = require('express')
const router = express.Router()
const userRouter = require('./userroutes')
const productRouter = require('./productroute')
router.use('/',userRouter)
router.use('/',productRouter)

module.exports = router