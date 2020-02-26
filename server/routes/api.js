const router = require('express').Router()
const ApiController = require('../controllers/apiController')

router.get('/city', ApiController.getCity)
router.post('/cost', ApiController.getCost)

module.exports = router
