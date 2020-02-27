const express = require('express')
const router = express.Router()
const ChartProduct = require('../controllers/chartProductController')
const ChartMall = require('../controllers/chartMallController')
const { authentication } = require('../middlewares/auth')

router.post('/product/user', authentication, ChartProduct.getUserChart)
router.patch('/product/:productId', authentication, ChartProduct.changeStatus)
router.post('/product/:productId', authentication, ChartProduct.addChart)
router.get('/mall/', ChartMall.getAll)
router.post('/mall/user', authentication, ChartMall.getUserChart)
router.post('/mall/:mallId', authentication, ChartMall.addChart)
module.exports = router
