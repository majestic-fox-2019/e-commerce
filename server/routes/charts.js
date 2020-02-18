const express = require('express')
const router = express.Router()
const ChartProduct = require('../controllers/chartProductController')
const ChartMall = require('../controllers/chartMallController')
const { authentication } = require('../middlewares/auth')

router.post('/product/:productId', authentication, ChartProduct.addChart)
router.post('/mall/:mallId', authentication, ChartMall.addChart)
module.exports = router
