const router = require('express').Router()
const TransactionController = require('../controllers/transactionController')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/:user_id', TransactionController.getTransaction)
router.put('/:user_id', TransactionController.checkoutTransaction)
router.post('/:user_id/:product_id', TransactionController.addTransaction)
router.delete('/:user_id/:transaction_id', TransactionController.deleteSingleTransaction)
router.patch('/:user_id/:product_id/:transaction_id', TransactionController.patchTransaction)

module.exports = router