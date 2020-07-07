const router = require('express').Router()
const TransactionController = require('../controllers/TransactionController')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', authorization, TransactionController.readAll)

module.exports = router